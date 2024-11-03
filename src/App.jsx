import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import Cam from './components/Cam.jsx';
import IntroPage from './components/IntroPage.jsx';
import './App.css'
import QuizPage from './components/QuizPage.jsx';
import AboutPage from './components/AboutPage.jsx';

const App = () => {
  return (
    // <>
    //   <AboutPage/>
    // </>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/AboutPage" element={<AboutPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/LoginPage/Cam" element={<Cam />} /> 
        <Route path="/LoginPage/Cam/QuizPage" element={<QuizPage />} /> 
      </Routes>
  );
}

export default App;