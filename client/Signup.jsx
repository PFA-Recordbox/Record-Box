import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ setUserCreds, setValidUser, validUser }) {
  // const [sendToLogin, setSendToLogin] = useState(false);

  // logic handling redirects if user is
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (sendToLogin) {
  //     navigate('login');
  //   }
  // }, [navigate, sendToLogin]);

  const createUser = async () => {
    const username = document.getElementById('signupName');
    const password = document.getElementById('signupPass');
    // stores user input into object for req body
    const userInput = {
      userID: username.value,
      userPassword: password.value,
    };
    // send request to server to create a new user
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      // save the response status code
      // ***MAKE SURE BACKEND IS SENDING THIS ON SUCCESS RESPONSE***
      const responseStatus = await response.status;
      // if response is good...
      if (responseStatus === 201) {
        // update validUser to true
        // update state's userCreds to the values submitted
        setValidUser(true);
        setUserCreds(userInput);
        sendToLogin = true;
      }
      return;
    } catch (err) {
      // alert message pops up in browser **CHANGE LATER**
      return alert(`Failed to create profile. Please try again. Error: ${err}`);
    }
  };

  return (
    <div id='signupBox'>
      <div id="loginRecordbox">Recordbox</div>
        <form id='signupForm'>
        <div className='loginInputAreas'>
          <input
            id='signupName'
            className='username'
            type='text'
            placeholder='Create Username'
          ></input>
          <input
            id='signupPass'
            className='password'
            type='password'
            placeholder='Create Password'
          ></input>
        </div>
        <div className='signupButtonHolder'>
          <button className='primary-button' onSubmit={createUser}>
            Create Account
          </button>
          <button
            className='secondary-button'
            onClick={() => navigate('../login')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
