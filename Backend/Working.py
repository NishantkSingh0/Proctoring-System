import cv2
import mediapipe as mp
import numpy as np


mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=False, max_num_faces=2, min_detection_confidence=0.5)
mp_drawing = mp.solutions.drawing_utils
mp_face_mesh = mp.solutions.face_mesh
drawing_spec = mp_drawing.DrawingSpec(thickness=1, circle_radius=1)
def calculate_distance2(point1, point2):
    return np.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
HEAD_MOVEMENT_THRESHOLD = 0.09
EYE_MOVEMENT_THRESHOLD = 0.03  

cap = cv2.VideoCapture(0)

with mp_face_mesh.FaceMesh(
    max_num_faces=2,
    refine_landmarks=True, 
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5) as face_mesh:

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(rgb_frame)

        if result.multi_face_landmarks:
            if len(result.multi_face_landmarks) > 1:
                cv2.putText(frame, "More than one person detected!", (50, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                # winsound.Beep(1500, 200)  
            for face_landmarks in result.multi_face_landmarks:
                mp_drawing.draw_landmarks(
                    image=frame,
                    landmark_list=face_landmarks,
                    connections=mp_face_mesh.FACEMESH_TESSELATION,
                    landmark_drawing_spec=drawing_spec,
                    connection_drawing_spec=drawing_spec
                )

                nose = face_landmarks.landmark[1]  
                left_eye_inner = face_landmarks.landmark[133]  
                right_eye_inner = face_landmarks.landmark[362]  

                distance1 = calculate_distance2(nose, left_eye_inner)
                distance2 = calculate_distance2(nose, right_eye_inner)

                if distance1 > HEAD_MOVEMENT_THRESHOLD or distance2 > HEAD_MOVEMENT_THRESHOLD:
                    cv2.putText(frame, "Be straight", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    # winsound.Beep(1000, 200)
                else:
                    cv2.putText(frame, "Face is stable.", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

                left_iris_indices = [468, 469, 470, 471]  
                right_iris_indices = [473, 474, 475, 476] 
                left_eye_center = face_landmarks.landmark[468]  
                right_eye_center = face_landmarks.landmark[473]  

                left_iris_movement = calculate_distance2(left_eye_inner, left_eye_center)
                right_iris_movement = calculate_distance2(right_eye_inner, right_eye_center)

                if left_iris_movement > EYE_MOVEMENT_THRESHOLD or right_iris_movement > EYE_MOVEMENT_THRESHOLD:
                    cv2.putText(frame, "Eyes off the screen!", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
                    # winsound.Beep(1200, 200)
                else:
                    cv2.putText(frame, "Eyes focused.", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        else:
            cv2.putText(frame, "Face not detected!", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        cv2.imshow('Face and Iris Tracking', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
