import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Router>
      <App/>
    </Router>
  </HashRouter>
);
