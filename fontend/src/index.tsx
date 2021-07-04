import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import MainRoute from './routes/route';
import './index.css';
import './App.css';
import './utils/interceptore';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

ReactDOM.render(
  <React.StrictMode>
    <MainRoute />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
