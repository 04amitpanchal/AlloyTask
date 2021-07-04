import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './login.css';

const Login = (props: any) => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    const requestBody = {
      emailId,
      password,
    };
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
      },
    };
    props.history.push('/Dashboard');
    axios
      .post('http://localhost:4000/login', requestBody, axiosConfig)
      .then((response) => {
        debugger;
        if (response.data.status == 200) {
          localStorage.setItem('token', response.data.token);
          props.history.push('/Dashboard');
        } else {
          message.error(`Something went wrong!!`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="top-container">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1>Sign in</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <a href="#">Forgot your password?</a>
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onLogin();
              }}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <button
                onClick={() => {
                  props.history.push('/register');
                }}
                className="ghost"
                id="signUp"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
