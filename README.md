# Online Exam Proctoring System 🎓📸
This project is a secure and AI-powered online exam proctoring system designed to ensure the integrity of remote assessments. The system combines machine learning models with real-time monitoring to ensure a distraction-free workspace, and maintain fairness during exams.

![Screenshot (224)](https://github.com/user-attachments/assets/0d8bf69c-6d1c-46e9-9a55-7feded37b6c2)
![Screenshot (225)](https://github.com/user-attachments/assets/c1162979-bfc6-4f91-994c-c8c191a7c6ee)


## Student Authentication
Student authentication makes sure that only the right students can take and submit the test. Students need to enter details like their Student ID, Date of Birth, Course, and Name. This information is checked to confirm their identity. It helps organizers allow only their registered students to access the exam, keeping the process fair and secure.

![Screenshot (226)](https://github.com/user-attachments/assets/17e8c575-737f-436b-82f9-1b9a9968783a)


## Face mesh Monitoring:
Webcam face mesh tracking takes online exam proctoring to the next level by actively monitoring the student's facial movements and eye behavior in real time. When students grant webcam access, our system uses WebSocket technology to connect the web interface to a highly optimized AI backend that processes the live feed with multithreading for smooth, instant tracking. The AI provides helpful, real-time guidance to ensure the student maintains the proper face positioning, keeping them focused and engaged. Once the system confirms correct alignment, the student is all set to begin the exam, knowing they are being carefully monitored for fairness and integrity.

![Screenshot (230)](https://github.com/user-attachments/assets/2b9ad54a-37d8-4689-9745-21afef663612)

[Proctoring test (Working).mp4](https://github.com/user-attachments/assets/18c8eea4-a01d-45fb-aad3-2e14e76cef68)


## Workspace Verification (Planned Feature)
We planned to integrate a robust workspace verification feature using lightweight object detection models like MobileNet or SSD to identify unauthorized devices such as phones, headphones, or watches in the student's workspace. This functionality would require live frames from mobile devices to be processed on an online server, necessitating the use of cloud computing services. However, to avoid the monthly operational costs associated with these services, this feature is currently paused. We aim to enable it in the future.

![Screenshot (233)](https://github.com/user-attachments/assets/2cc73019-09f4-49e1-85e7-2ee18cc2309e)
<div align="center">
  <h4><a href="https://github.com/NishantkSingh0/MobView" style="font-family: Arial; color: blue;">Mobile-Connectivity</a></h4>
</div>

## Quiz page:
On the quiz page, you’ll find 10 basic DSA (Data Structures and Algorithms) questions, each with four options. Simply click on the correct answers and submit them within the 5-minute time limit. The system is designed to ensure fair conduct and will automatically submit your quiz if any of the following happens:    
* you frequently move your face away from the screen   
* attempt to switch to another tab, or blur the current working tab during the exam   
* any third person or restricted items will detect.

![Screenshot (232)](https://github.com/user-attachments/assets/bda7efcd-8cb7-4cf5-8b1e-c6831ebf1de1)
![Screenshot (231)](https://github.com/user-attachments/assets/551243bc-33c6-435b-9c1c-ffb2654150ed)


## An Animation video which explain working and how to use this project model:

[How it works (Animation).webm](https://github.com/user-attachments/assets/539b5980-74cc-4066-a3ae-af2440fe1ebc)


## Requirements:
### Backend   
* Flask==2.3.2
* Flask-SocketIO==5.3.2
* Flask-Cors==3.0.10
* opencv-python==4.8.0.74
* numpy==1.25.2
* mediapipe==0.10.3
* Pillow==10.0.0
* engineio==4.3.4
* threadpoolctl==3.2.0

### Frontend   
* "@chakra-ui/react": "^3.0.2",
* "@emotion/react": "^11.13.3",
* "@emotion/styled": "^11.13.0",
* "@mui/material": "^6.1.6",
* "framer-motion": "^11.11.11",
* "lucide-react": "^0.454.0",
* "react": "^18.3.1",
* "react-dom": "^18.3.1",
* "react-router-dom": "^6.27.0",
* "socket.io-client": "^4.8.1"


## We got 3rd rank on collage hackathon (techqizard) with this project. this is my first hackathon and ranking in it will be a great achievement for me 😊
