import React from 'react';
import { Routes, Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
      <App/>
  </HashRouter>
)