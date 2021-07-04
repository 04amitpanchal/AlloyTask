import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import '../Login/login.css';

const RegisterUser = (props: any) => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const onCreateAccount = () => {
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
    props.history.push('/');
    axios
      .post('http://localhost:4000/register', requestBody, axiosConfig)
      .then((response) => {
        message.success(`Account Created Successfully !!`);
        localStorage.setItem('token', response.data.token);
        props.history.push('/Dashboard');
      })
      .catch((error) => {
        message.error(`Something went wrong!!`);
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
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setfirstName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setlastName(e.target.value);
              }}
            />
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
            <button
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onCreateAccount();
              }}
            >
              Create Account
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
