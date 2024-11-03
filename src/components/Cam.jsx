import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const Cam = () => {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const getCameraStream = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640},
          height: { ideal: 480},
          facingMode: 'user'
        }
      });
      setStream(mediaStream);
      setIsConnecting(false);
    } catch (err) {
      setError(err.name === 'NotAllowedError' ? 'Camera access was denied. Please check your permissions.': 'Camera is not available or not detected.');
      setIsConnecting(false);
    }
  };

  // const stopCamera = () => {
  //   if (stream) {
  //     stream.getTracks().forEach(track => track.stop());
  //     setStream(null);
  //   }
  // };
  const startExam=(e)=> {
    e.preventDefault();
      navigate('./QuizPage');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Camera Page */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        {/* <h1 className="text-3xl font-bold text-gray-700 mb-4">Web Camera</h1> */}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {stream ? (
          <div className="flex flex-col items-center">
            <video
              className="w-96 h-72 border-4 border-green-500 rounded-lg mb-4"
              autoPlay
              playsInline
              ref={(video) => {
                if (video) {
                  video.srcObject = stream;
                }
              }}
            />
          </div>
        ) : (
          <div className="w-96 h-72 border-4 border-gray-300 rounded-lg flex items-center justify-center">
            <button
              onClick={getCameraStream}
              disabled={isConnecting}
              className={`
                ${isConnecting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'}
                text-white py-2 px-4 rounded focus:outline-none
              `}
            >
              {isConnecting ? 'Connecting...' : 'Connect Camera'}
            </button>
          </div>
        )}
        <button
          onClick={startExam}
          disabled={!stream} // Disable the button if the camera stream is not active
          className={`mt-4 py-2 px-4 rounded focus:outline-none 
            ${stream 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        >
          Start Exam
        </button>
            
      </div>

      {/* About Page */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Camera Access</h1> {/* Underline */}
        <div className="text-gray-600 space-y-4">
          <p>
          The camera feature promotes a fair testing environment by monitoring exam sessions to maintain academic integrity, prioritizing user privacy and ease of use. The camera window is adjustable, allowing flexible placement to minimize distractions during the test. <br />
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Important Guidelines</h3>
            <ul className="list-disc list-inside">
              <li>Maintain focus on the screen.</li>
              <li>Ensure you are alone during the exam.</li>
              <li>Keep your face well-lit and visible.</li>
              <li>Avoid using prohibited items (phones, earphones, books, etc.).</li>
              <li>Stay in the exam area for the entire duration.</li>
            </ul>
          </div>
          <div className="text-sm text-gray-600 italic">
            <p><b>Note</b> This exam is monitored solely by an AI system, without human oversight. More than three instances of suspicious behavior will result in automatic disqualification. No appeals or delays are allowed. The AI ensures fairness, disqualifying cheaters immediately to uphold examination standards.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cam;