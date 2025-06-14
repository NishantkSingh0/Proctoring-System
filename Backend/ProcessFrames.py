import cv2
import mediapipe as mp
import math

mp_face_mesh=mp.solutions.face_mesh
face_mesh=mp_face_mesh.FaceMesh(refine_landmarks=True,max_num_faces=1)
mp_drawing=mp.solutions.drawing_utils

drawing_spec=mp_drawing.DrawingSpec(thickness=1,circle_radius=1,color=(200,200,200))

LEFT_IRIS_INDEX=468    
RIGHT_IRIS_INDEX=473

initial_iris_distance=None

IRIS_MOVEMENT_THRESHOLD=4       # Adjust the IRIS threshold here
FACE_ROTATION_THRESHOLD_RATIO=0.088     # Adjust the Fave Movement threshold here

def euclidean_distance(pt1,pt2):
    return math.sqrt((pt1[0]-pt2[0])**2 + (pt1[1]-pt2[1])**2)

def Process(frame):
    global initial_iris_distance

    frame_rgb=cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
    results=face_mesh.process(frame_rgb)
    h,w,_=frame.shape
    message=""

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            # Draw facemesh with reduced intensity
            mp_drawing.draw_landmarks(
                image=frame,
                landmark_list=face_landmarks,
                connections=mp_face_mesh.FACEMESH_TESSELATION,
                landmark_drawing_spec=None,
                connection_drawing_spec=drawing_spec
            )

            try:
                left_iris=face_landmarks.landmark[LEFT_IRIS_INDEX]
                right_iris=face_landmarks.landmark[RIGHT_IRIS_INDEX]

                left_iris_pt=(int(left_iris.x*w),int(left_iris.y*h))
                right_iris_pt=(int(right_iris.x*w),int(right_iris.y*h))

                cv2.circle(frame,left_iris_pt,2,(0,255,0),-1)
                cv2.circle(frame,right_iris_pt,2,(0,255,0),-1)

                iris_distance=euclidean_distance(left_iris_pt,right_iris_pt)

                if initial_iris_distance is None:
                    initial_iris_distance=iris_distance

                if iris_distance < w*FACE_ROTATION_THRESHOLD_RATIO:
                    message="Be Straight"
                elif abs(iris_distance-initial_iris_distance) > IRIS_MOVEMENT_THRESHOLD:
                    message="Eye movement detected"

            except:
                message="Eye ball not detected"
    else:
        message="Eye ball not detected"

    if message:
        cv2.putText(frame,message,(20,40),cv2.FONT_HERSHEY_SIMPLEX,1,(0,0,255),2)

    return frame
