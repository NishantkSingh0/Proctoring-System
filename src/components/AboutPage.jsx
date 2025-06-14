import React from 'react';

const AboutPage = () => {
  // Simple SVG icons
  const icons = {
    shield: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v9a6 6 0 0 0 9 5 6 6 0 0 0 9-5V7L12 2Z" />
      </svg>
    ),
    camera: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
    scan: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" y1="12" x2="17" y2="12" />
      </svg>
    ),
    clock: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  };

  const features = [
    {
      icon: icons.shield,
      title: "Secure Authentication",
      description: "Students must verify their identity using Student ID, Name, Date of Birth and Course before accessing the exam."
    },
    {
      icon: icons.camera,
      title: "AI-Powered Monitoring",
      description: "Real-time face and eye tracking ensures exam integrity through continuous monitoring."
    },
    {
      icon: icons.scan,
      title: "Workspace Verification",
      description: "Students must scan their workspace using their mobile device to detect any unauthorized materials."
    },
    {
      icon: icons.clock,
      title: "Timed Assessment",
      description: "10 Multiple Choice Questions (MCQs) with a 5-minute time limit for fair evaluation."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Online Exam Proctoring System
          </h1>
          <p className="text-xl text-gray-600">
            Ensuring academic integrity through advanced monitoring and authentication
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <ol className="space-y-4">
              {['Student Authentication', 'Camera Access', 'Workspace Verification', 'Begin Exam'].map((step, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step}</h3>
                    <p className="text-gray-600">
                      {index === 0 && "Enter your credentials including Student ID, Date of Birth, Course, and Name to verify your identity."}
                      {index === 1 && "Grant camera access for face and eye detection monitoring throughout the exam."}
                      {index === 2 && "Use your mobile device to scan and verify your workspace for prohibited items."}
                      {index === 3 && "Complete 10 MCQs within the 5-minute time limit while being monitored."}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center"> {/* Added flex container */}
              {icons.eye}
              <h2 className="text-2xl font-semibold mb-2">Ready to Begin?</h2>
              <p className="text-gray-600">
                Make sure you have a working webcam and mobile device for workspace scanning before starting the exam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;