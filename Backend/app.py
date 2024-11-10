from flask import Flask
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import cv2
import numpy as np
import base64
import mediapipe as mp
from PIL import Image
import io
import logging
from engineio.payload import Payload
from concurrent.futures import ThreadPoolExecutor
import queue
from threading import Lock
import threading
from functools import partial

Payload.max_decode_packets = 50
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

socketio = SocketIO(app, 
                   cors_allowed_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
                   ping_timeout=60,
                   ping_interval=25,
                   async_mode='threading')

frame_queue = queue.Queue(maxsize=30)  
result_queue = queue.Queue(maxsize=30)
mediapipe_lock = Lock()  

MAX_WORKERS = 2  
thread_pool = ThreadPoolExecutor(max_workers=MAX_WORKERS)

class FaceMeshProcessor:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=False,
            max_num_faces=2,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.mp_drawing = mp.solutions.drawing_utils
        self.drawing_spec = self.mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
        self.HEAD_MOVEMENT_THRESHOLD = 0.09
        self.EYE_MOVEMENT_THRESHOLD = 0.03

    @staticmethod
    def calculate_distance2(point1, point2):
        return np.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)

    def process_frame(self, frame_data):
        try:
            # Decode base64 image
            img_data = base64.b64decode(frame_data)
            img = Image.open(io.BytesIO(img_data))
            capturedFrames = cv2.resize(np.array(img), (620, 480))
            rgb_frame = cv2.cvtColor(capturedFrames, cv2.COLOR_BGR2RGB)

            # Process with MediaPipe (thread-safe)
            with mediapipe_lock:
                result = self.face_mesh.process(rgb_frame)

            if result.multi_face_landmarks:
                if len(result.multi_face_landmarks) > 1:
                    cv2.putText(rgb_frame, "More than one person detected!", (50, 150),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

                for face_landmarks in result.multi_face_landmarks:
                    self._process_single_face(rgb_frame, face_landmarks)
            else:
                logger.debug("No faces detected in the frame")
                cv2.putText(rgb_frame, "Face not detected!", (50, 50),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

            # Encode processed frame
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 85]
            _, buffer = cv2.imencode('.jpg', rgb_frame, encode_param)
            return base64.b64encode(buffer).decode('utf-8')

        except Exception as e:
            logger.error(f"Critical error processing frame: {str(e)}")
            logger.exception("Full traceback:")
            return self._create_error_frame(str(e))

    def _process_single_face(self, rgb_frame, face_landmarks):
        try:
            with mediapipe_lock:
                self.mp_drawing.draw_landmarks(
                    image=rgb_frame,
                    landmark_list=face_landmarks,
                    connections=self.mp_face_mesh.FACEMESH_TESSELATION,
                    landmark_drawing_spec=self.drawing_spec,
                    connection_drawing_spec=self.drawing_spec
                )

            nose = face_landmarks.landmark[1]
            left_eye_inner = face_landmarks.landmark[133]
            right_eye_inner = face_landmarks.landmark[362]

            self._check_head_movement(rgb_frame, nose, left_eye_inner, right_eye_inner)
            
            if len(face_landmarks.landmark) > 468:
                self._process_iris_tracking(rgb_frame, face_landmarks, left_eye_inner, right_eye_inner)
            else:
                cv2.putText(rgb_frame, "Basic eye tracking mode", (50, 100),cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 165, 0), 2)

            nose_tip = (int(nose.x * rgb_frame.shape[1]),int(nose.y * rgb_frame.shape[0]))
            cv2.circle(rgb_frame, nose_tip, 5, (0, 255, 0), -1)

        except Exception as e:
            logger.error(f"Error processing facial features: {str(e)}")
            cv2.putText(rgb_frame, f"Error: {str(e)}", (50, 200),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    def _check_head_movement(self, frame, nose, left_eye_inner, right_eye_inner):
        distance1 = self.calculate_distance2(nose, left_eye_inner)
        distance2 = self.calculate_distance2(nose, right_eye_inner)

        if distance1 > self.HEAD_MOVEMENT_THRESHOLD or distance2 > self.HEAD_MOVEMENT_THRESHOLD:
            cv2.putText(frame, "Be straight", (50, 50),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "Face is stable.", (50, 50),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    def _process_iris_tracking(self, frame, face_landmarks, left_eye_inner, right_eye_inner):
        left_iris_center = face_landmarks.landmark[468]
        right_iris_center = face_landmarks.landmark[473]

        left_iris_movement = self.calculate_distance2(left_eye_inner, left_iris_center)
        right_iris_movement = self.calculate_distance2(right_eye_inner, right_iris_center)

        if left_iris_movement > self.EYE_MOVEMENT_THRESHOLD or right_iris_movement > self.EYE_MOVEMENT_THRESHOLD:
            cv2.putText(frame, "Eyes off the screen!", (50, 100),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "Eyes focused.", (50, 100),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        iris_left = np.array([int(left_iris_center.x * frame.shape[1]),
                            int(left_iris_center.y * frame.shape[0])])
        iris_right = np.array([int(right_iris_center.x * frame.shape[1]),
                             int(right_iris_center.y * frame.shape[0])])
        cv2.circle(frame, tuple(iris_left), 3, (0, 255, 255), -1)
        cv2.circle(frame, tuple(iris_right), 3, (0, 255, 255), -1)

    @staticmethod
    def _create_error_frame(error_message):
        blank_frame = np.zeros((480, 620, 3), np.uint8)
        error_message = error_message[:50] + "..." if len(error_message) > 50 else error_message
        cv2.putText(blank_frame, f"Error: {error_message}", (50, 240),cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
        _, buffer = cv2.imencode('.jpg', blank_frame)
        return base64.b64encode(buffer).decode('utf-8')

face_processor = FaceMeshProcessor()

@socketio.on('connect')
def handle_connect():
    logger.info('Client connected')
    emit('connect_response', {'data': 'Connected successfully'})

@socketio.on('disconnect')
def handle_disconnect():
    logger.info('Client disconnected')

@socketio.on('frame')
def handle_frame(data):
    try:
        logger.debug("Received frame from client")
        # Submit frame processing task to thread pool
        future = thread_pool.submit(face_processor.process_frame, data['image'])
        processed_frame = future.result()
        emit('processed_frame', {'image': processed_frame})
        logger.debug("Sent processed frame to client")
    except Exception as e:
        logger.error(f"Error handling frame: {str(e)}")
        emit('error', {'message': str(e)})

@socketio.on_error_default
def default_error_handler(e):
    logger.error(f"SocketIO error: {str(e)}")
    emit('error', {'message': 'An internal server error occurred'})

if __name__ == '__main__':
    logger.info("Starting server...")
    socketio.run(app, debug=True, host='0.0.0.0', port=5000,
                allow_unsafe_werkzeug=True)