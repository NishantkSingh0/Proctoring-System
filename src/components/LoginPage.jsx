import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';


const LoginPage=()=>{
  const [formData, setFormData]=useState({sid: '', name: '', DOB: '', class: ''});
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    e.preventDefault();
    const ValidSID=[230201001, 230201002, 230201003, 230201004, 230201005, 230201006, 230201007, 230201008, 230201009, 230201010, 230201011, 230201012, 230201013, 230201014, 230201015, 230201016, 230201017, 230201018, 230201019, 230201020, 230201021, 230201022, 230201023, 230201024, 230201025, 230201026, 230201027, 230201028, 230201029, 230201030, 230201031, 230201032];

    if(ValidSID.includes(parseInt(formData.sid))){
      console.log('Form submitted:', formData);
      navigate('./Cam');
    }else{
      alert("Wrong SID");
    }
  };

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-700">Exam Proctoring System</h1>
          <p className="mt-3 text-lg font-semibold text-gray-600">Student Login Page</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-96 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Student Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="sid" className="block text-sm font-medium text-gray-700">College SID</label>
              <input type="number" id="sid" name="sid" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.sid} onChange={handleChange} placeholder="Enter your Student ID" />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor="DOB" className="block text-sm font-medium text-gray-700">Date of birth</label>
              <input type="date" id="DOB" name="DOB" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.DOB} onChange={handleChange} placeholder="Enter University name" />
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
              <select id="class" name="class" required className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formData.class} onChange={handleChange}>
                <option value="">Select Course</option>
                <option value="BCA">BCA</option>
                <option value="BTech">BTech</option>
                <option value="MCA">MCA</option>
                <option value="MTech">MTech</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 py-2 px-4 rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
