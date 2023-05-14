import React from "react";
import { Link, Redirect } from "react-router-dom";

function Signup({ setUserCreds, setValidUser }) {

  const createUser = async () => {
    const username = document.getElementById('signupName');
    const password = document.getElementById('signupPass');
    // stores user input into object for req body
    const userInput = {
      username: username.value,
      password: password.value,
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
        // update state's userCreds to the values submitted
        setUserCreds(userInput);
        // update validUser to true
        setValidUser(true);
        // redirect to login
        return <Redirect to='/login' />;
      } else {
        return;
      }
    } catch (err) {
      // alert message pops up in browser **CHANGE LATER**
      return alert('Failed to create profile. Please try again.');
    };
  }

  return (
    <div id='signupBox'>
      <form id='signupForm'>
        <input id='signupName' className='username' type='text' placeholder='Username'></input>
        <input id='signupPass' className='password' type='password' placeholder='Password'></input>
        <button className='primary-button' onSubmit={createUser}>Create Account</button>
        <Link className='secondary-button' to='/login'>Cancel</Link>
      </form>
    </div>
    
  );
}

export default Signup;