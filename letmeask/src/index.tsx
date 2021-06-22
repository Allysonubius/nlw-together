import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase.service';

import './styles/global.style.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

