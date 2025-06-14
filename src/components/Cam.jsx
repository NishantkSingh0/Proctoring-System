import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';

const Cam=()=>{
  const [stream, setStream]=useState(null);
  const [error, setError]=useState(null);
  const [isConnecting, setIsConnecting]=useState(false);
  const [ws, setWs]=useState(null);
  const [connected, setConnected]=useState(false);
  const videoRef=useRef(null);
  const canvasRef=useRef(null);
  const processedImgRef=useRef(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const socket=new WebSocket('ws://localhost:8765');
    
    socket.onopen=()=>{
      console.log('✅ WebSocket connected');
      setConnected(true);
    };
    
    socket.onerror=err=>{
      console.error('WebSocket error:', err);
      setError('Failed to connect to the processing server');
    };
    
    socket.onclose=()=>{
      console.log('🔌 WebSocket disconnected');
      setConnected(false);
    };
  
    socket.onmessage=(event)=>{
      if (typeof event.data==='string' && event.data.startsWith('error:')) {
        console.error('Server error:', event.data);
        setError(`Server error: ${event.data.substring(6)}`);
        return;
      }
  
      if (processedImgRef.current) {
        processedImgRef.current.src=`data:image/jpeg;base64,${event.data}`;
      }
    };
  
    setWs(socket);
    
    return ()=>{
      if (socket.readyState===WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const getCameraStream=async ()=>{
    setIsConnecting(true);
    setError(null);

    try {
      const mediaStream=await navigator.mediaDevices.getUserMedia({
        video: { 
          width: {ideal: 360}, 
          height: {ideal: 270}, 
          frameRate: {ideal: 18},
          facingMode: 'user' 
        }
      });
      setStream(mediaStream);
      
      const videoTrack=mediaStream.getVideoTracks()[0];
      if (videoTrack) {
        console.log('Using video device: ' + videoTrack.label);
        console.log('Video track settings:', videoTrack.getSettings());
      }
      
      setIsConnecting(false);
    } catch (err) {
      console.error('Camera error:', err);
      setError(err.name==='NotAllowedError'
      ?'Camera access was denied. Please check your permissions.'
      :'Camera is not available or not detected.');
      setIsConnecting(false);
    }
  };

  const startExam=(e)=>{
    e.preventDefault();
    navigate('./QuizPage');
  };

  useEffect(()=>{
    if (!stream || !videoRef.current || !canvasRef.current || !ws || !connected) return;

    const video=videoRef.current;
    const canvas=canvasRef.current;
    const ctx=canvas.getContext('2d');

    video.srcObject=stream;
    
    video.onloadedmetadata=()=>{
      video.play();
      console.log(`Video dimensions: ${video.videoWidth}x${video.videoHeight}`);
    };

    const FRAME_WIDTH=360;
    const FRAME_HEIGHT=270;
    
    canvas.width=FRAME_WIDTH;
    canvas.height=FRAME_HEIGHT;

    let lastFrameTime=0;
    const frameInterval=1000/18;

    const sendFrame=(timestamp)=>{
      if (timestamp - lastFrameTime < frameInterval) {
        requestAnimationFrame(sendFrame);
        return;
      }
      
      lastFrameTime=timestamp;
      
      if (!video.videoWidth || !video.videoHeight) {
        requestAnimationFrame(sendFrame);
        return;
      }
      
      ctx.drawImage(video, 0, 0, FRAME_WIDTH, FRAME_HEIGHT);

      try {
        const dataURL=canvas.toDataURL('image/jpeg', 0.6);
        const base64=dataURL.split(',')[1]; 

        if (ws.readyState===WebSocket.OPEN) {
          ws.send(base64);
        }
      } catch (err) {
        console.error('Error capturing frame:', err);
      }
      
      requestAnimationFrame(sendFrame);
    };

    requestAnimationFrame(sendFrame);
    
    return ()=>{
      // No need to clear interval since we're using requestAnimationFrame
    };
  }, [stream, ws, connected]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Camera Page */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {stream?(
        <div className="flex flex-col items-center">
          <img
            ref={processedImgRef}
            alt="Processed stream"
            className="w-96 h-72 border-4 border-green-500 rounded-lg mb-4 object-cover"
          />
          {/* Video element is still needed for capture but hidden */}
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            style={{display: 'none'}}
          />
          <canvas ref={canvasRef} width="360" height="270" style={{display: 'none'}} />
          <p className="text-sm text-gray-600">
            {connected?'✅ Connected to processing server':'❌ Not connected to processing server'}
          </p>
        </div>
      ):(
        <div className="w-96 h-72 border-4 border-gray-300 rounded-lg flex items-center justify-center">
          <button
            onClick={getCameraStream}
            disabled={isConnecting}
            className={`
              ${isConnecting?'bg-gray-400 cursor-not-allowed':'bg-blue-600 hover:bg-blue-700'}
              text-white py-2 px-4 rounded focus:outline-none
            `}
          >
            {isConnecting?'Connecting...':'Connect Camera'}
          </button>
        </div>
      )}

        <button
          onClick={startExam}
          disabled={!stream || !connected}
          className={`mt-4 py-2 px-4 rounded focus:outline-none 
            ${(stream && connected) 
            ?'bg-green-600 text-white hover:bg-green-700' 
            :'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
        >
          Start Exam
        </button>
      </div>

      {/* About Page */}
      <div className="w-1/2 bg-white p-8 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Camera Access</h1>
        <div className="text-gray-600 space-y-4">
          <p>
            The camera feature promotes a fair testing environment by monitoring exam sessions to maintain academic integrity, prioritizing user privacy and ease of use.
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
            <p><b>Note</b>: This exam is monitored solely by an AI system. More than three instances of suspicious behavior will result in automatic disqualification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cam;