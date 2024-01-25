import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './index.css';
import App from './App';
import LoginTemplate from './LoginTemplate';

import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/LoginTemplate" element={<LoginTemplate />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);