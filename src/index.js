import React from 'react';
import ReactDOM from 'react-dom';
// import './assets/style.css';
import App from './app.js';
import {  BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
, document.getElementById('root'));
