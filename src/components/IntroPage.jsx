import React from 'react';
import {useNavigate} from 'react-router-dom';
import logo from './image/Logo.jpeg'
import pic from './image/pic.png'

const IntroPage=()=>{
  const navigate=useNavigate(); 

  const handleSignInClick=()=>{
    navigate('/LoginPage'); 
  };
  const handleAboutClick=()=>{
    navigate('/AboutPage'); 
  };
  
  return (
    <div className="font-sans p-5">
      <header className="flex justify-end gap-12 py-">
        <div className="absolute top-6 w-16 mr-[1200px]">
          <img src={logo} alt="Logo Not found" />
        </div>
        <h2 className="text-lg">Home</h2>
        <h2 className="text-lg">Other</h2>
        <button
          className="bg-teal-500 border-none py-2 px-5 text-white cursor-pointer rounded mt-[-3px]"
          onClick={handleSignInClick} 
        >
          Log in →
        </button>
      </header>
      <section className="flex items-center justify-between pl-12 py-[120px]">
        <div className="text-content">
          <h1 className="text-4xl font-bold">Hi, We are Team BRAVERS</h1>
          <div className="inline-block mt-2">
            <p className="text-lg mt-2">
              Our Proctoring System is designed to maintain the<br />
              Value of online exams. through AI-driven monitoring<br />
              and real-time analysis.
            </p>
            <button
              className="bg-teal-500 border-none py-3 px-7 text-white cursor-pointer rounded text-base absolute mt-[35px]"
              onClick={handleAboutClick} 
            >
              About →
            </button>
            {/* <button className="bg-teal-500 border-none py-3 px-7 text-white cursor-pointer rounded text-base absolute mt-[35px] ">
              About →
            </button> */}
          </div>
        </div>
        <div className="hidden md:block relative right-[120px]">
          <img className="h-[350px] w-[350px]" src={pic} alt="Image not found" />
        </div>

      </section>
    </div>
  );
};

export default IntroPage;
