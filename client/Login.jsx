import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setUserCreds, validUser, setValidUser }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (validUser) {
      navigate('../');
    }
  }, [navigate, validUser]);

  // function sends a request to server to validate user's credentials
  const sendLoginCredentials = async () => {
    // pull user's input from browser
    const username = document.getElementById('loginName');
    const password = document.getElementById('loginPass');
    // stores user input into object for req body
    const userInput = {
      userId: username.value,
      userPassword: password.value,
    };
    // post request to server
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      // save the response status code
      // ***MAKE SURE BACKEND IS SENDING THIS ON SUCCESS RESPONSE***
      const responseStatus = await response.status;
      // if response status is good...
      if (responseStatus === 201) {
        // update state with validUser being true
        // update state with userInput
        setValidUser(true);
        setUserCreds(userInput);
        // redirect user to home page
        return;
      } else {
        // alert message pops up in browser **CHANGE LATER**
        return alert('Invalid username/password');
      }
    } catch (err) {
      return `Error in fetch request from client. Error: ${err}`;
    }
  };

  return (
    <div id='loginBox'>
      <h1>Please Log In to Continue</h1>
      <form id='inputForm'>
        <input
          id='loginName'
          className='username'
          type='text'
          placeholder='Username'
        ></input>
        <input
          id='loginPass'
          className='password'
          type='password'
          placeholder='Password'
        ></input>
        <button className='primary-button' onSubmit={sendLoginCredentials}>
          Login
        </button>
        <button className='secondary-button' onClick={() => navigate('signup')}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
