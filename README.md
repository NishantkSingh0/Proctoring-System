# Online Exam Proctoring System 🎓📸
This project is a secure and AI-powered online exam proctoring system designed to ensure the integrity of remote assessments. The system combines machine learning models with real-time monitoring to ensure a distraction-free workspace, and maintain fairness during exams.

![Screenshot (224)](https://github.com/user-attachments/assets/0d8bf69c-6d1c-46e9-9a55-7feded37b6c2)
![Screenshot (225)](https://github.com/user-attachments/assets/c1162979-bfc6-4f91-994c-c8c191a7c6ee)

## Student Authentication
Student authentication makes sure that only the right students can take and submit the test. Students need to enter details like their Student ID, Date of Birth, Course, and Name. This information is checked to confirm their identity. It helps organizers allow only their registered students to access the exam, keeping the process fair and secure.
![Screenshot (226)](https://github.com/user-attachments/assets/17e8c575-737f-436b-82f9-1b9a9968783a)

## Face mesh Monitoring:
Webcam face mesh tracking takes online exam proctoring to the next level by actively monitoring the student's facial movements and eye behavior in real time. When students grant webcam access, our system uses WebSocket technology to connect the web interface to a highly optimized AI backend that processes the live feed with multithreading for smooth, instant tracking. The AI provides helpful, real-time guidance to ensure the student maintains the proper face positioning, keeping them focused and engaged. Once the system confirms correct alignment, the student is all set to begin the exam, knowing they are being carefully monitored for fairness and integrity.

## Workspace Verification (Planned Feature)
We planned to integrate a robust workspace verification feature using lightweight object detection models like MobileNet or SSD to identify unauthorized devices such as phones, headphones, or watches in the student's workspace. This functionality would require live frames from mobile devices to be processed on an online server, necessitating the use of cloud computing services. However, to avoid the monthly operational costs associated with these services, this feature is currently paused. We aim to enable it in the future.
