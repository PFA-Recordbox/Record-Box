import React, { useState } from 'react';
import SearchContainer from './containers/SearchContainer.jsx';
import RecordContainer from './containers/RecordContainer.jsx';
import createTestData from './testdata.js';

function HomePage() {
  const [verified, setVerified] = useState(false);

  const userRecords = createTestData();

  const handleRecordListLoad = () => {
    if (verified) {
      const inputForm = document.getElementById('inputForm');
      if (inputForm) {
        inputForm.parentNode.removeChild(inputForm);
      }
    }
  }

  const verifyUser = async (e) => {
    e.preventDefault();
    // pull user input
    const name = document.getElementById('username');
    const pass = document.getElementById('password');
    // define request body
    const reqObj = {
      username: name.value,
      password: pass.value,
    }

    try {
      console.log('client fetch trying')
      const response = await fetch('./login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqObj),
      })
      if (response.status === 201){
        const result = await response.json();
        console.log('fetchResults: ', result);
        userRecords = result;
        setVerified(true);
        handleRecordListLoad();
        return;
      }
      else return `Error in fetch request from client login. Invalid info.`
    } catch (err) {
      return `Error in fetch request from client login. Error: ${err}`;
    }
  };

  return (
    <>
    {/* <div id="loginBox">
      <form id="inputForm">
        <input id="username" type="text" placeholder="Username"></input>
        <input id="password" type="password" placeholder="Password"></input>
        <button onSubmit={(e) => verifyUser(e)}>Login</button>
      </form>
    </div> */}
    <div id="HomePage">
      <div id="search-container">
          <SearchContainer />
      </div>
      <div id="record-container">
          <RecordContainer userRecords={userRecords}/>
      </div>
    </div>
  </>
  )

};


export default HomePage;