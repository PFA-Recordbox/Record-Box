import React from "react";
import { Link, Redirect } from "react-router-dom";

function Signup({ setUserCreds, setValidUser, validUser }) {

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
        // update validUser to true
        // update state's userCreds to the values submitted
        setValidUser(true);
        setUserCreds(userInput);
      }
      return;
    } catch (err) {
      // alert message pops up in browser **CHANGE LATER**
      return alert(`Failed to create profile. Please try again. Error: ${err}`);
    };
  }

  return (
    <div id='signupBox'>
      {/* once validUser evaluates to true from a successful server response, the user will be redirected to the home page */}
      {validUser && <Redirect to='/' />}
      <h1>Please Create An Account</h1>
      <form id='signupForm'>
        <input
          id='signupName'
          className='username'
          type='text'
          placeholder='Username'
        ></input>
        <input
          id='signupPass'
          className='password'
          type='password'
          placeholder='Password'
        ></input>
        <button className='primary-button' onSubmit={createUser}>
          Create Account
        </button>
        <Link className='secondary-button' to='login'>
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default Signup;