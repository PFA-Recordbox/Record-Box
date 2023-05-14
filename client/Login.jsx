import React from "react";
import { Link, Redirect } from "react-router-dom";


function Login({setUserCreds, setValidUser}) {

  // function sends a request to server to validate user's credentials
  const sendLoginCredentials = async () => {
    // pull user's input from browser
    const username = document.getElementById('loginName');
    const password = document.getElementById('loginPass');
    // stores user input into object for req body
    const userInput = {
      username: username.value,
      password: password.value,
    };
    // post request to server
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInput),
      })
      // save the response status code 
      // ***MAKE SURE BACKEND IS SENDING THIS ON SUCCESS RESPONSE***
      const responseStatus = await response.status;
      // if response status is good...
      if (responseStatus === 201) {
        // update state with userInput
        setUserCreds(userInput);
        // update state with validUser being true
        setValidUser(true);
        // redirect user to home page
        return (
          <Redirect to='/home' />
        )
      } else {
        // alert message pops up in browser **CHANGE LATER**
        return alert('Invalid username/password');
      }

    } catch (err) {
      return `Error in fetch request from client. Error: ${err}`
      
    }
  }

  return (
    <div id='loginBox'>
      <form id='inputForm'>
        <input id='loginName' className='username' type='text' placeholder='Username'></input>
        <input id='loginPass' className='password' type='password' placeholder='Password'></input>
        <button className='primary-button' onSubmit={sendLoginCredentials}>Login</button>
        <Link className='secondary-button' to='/signup'>Sign Up</Link>
      </form>
    </div>
  );

}

export default Login;