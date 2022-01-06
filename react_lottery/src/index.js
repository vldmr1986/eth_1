import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getEthInstance} from './constants';

getEthInstance()?.on('accountsChanged', function (accounts) {  // eslint-disable-line

  console.log("reload page accounts: ", accounts);
  window.location.reload(); // reload page
  // Time to reload your interface with accounts[0]!
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
