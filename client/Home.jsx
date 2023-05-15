import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import SearchContainer from './containers/SearchContainer.jsx';
import RecordContainer from './containers/RecordContainer.jsx';
import createTestData from './testdata.js';

function HomePage({ userCreds, validUser }) {
  /* define unfiltered records from database in state so searchcontainer can access them 
  We won't modify them in the searchcontainer, just use them as reference*/
  const [userRecords, setUserRecords] = useState({});
  /* create filtered records in state so we can render them 
  in the RecordContainer dynamically */
  const [filteredRecords, setFilteredRecords] = useState({});
  
  const testRecords = createTestData();
  
  // retrieve records for current user; this fires on page load
  // **** ARE WE USING A SESSION COOKIE ONCE THE USER IS VALIDATED AND LOGS IN?? *****
  const retrieveRecords = async () => {
    try {
      const response = await fetch('/home')
      // define response status
      const responseStatus = await response.status;
      // take user datastream and turn into usable js code
      const records = await response.json();
      // ***** CHECK IF SERVER IS SENDING BACK PROPER STATUS CODE *****
      if (responseStatus === 200) {
        // if response status is good, setUserRecords and setFilteredRecords with data
        setUserRecords(records);
        setFilteredRecords(records);
      }
      return;
    } catch (err) {
      return `Error with retrieving user records in Home Page. Error: ${err}.`
    }
  }

  return (
    <div id='HomePage'>
      {/* if the validUser state is false, this will redirect to the login page */}
      {validUser ? null : <Redirect to='login' />}
      <h1>Welcome to your Home Page</h1>
      <div id='search-container'>
        {/* pass down the full list of original records and setUserRecords since we want a re-render to show the added entries;
        Also the ability to setFilteredRecords so the records will re-render on the state change based on the filter */}
        <SearchContainer
          userRecords={userRecords}
          setUserRecords={setUserRecords}
          setFilteredRecords={setFilteredRecords}
        />
      </div>
      <div id='record-container' onLoad={retrieveRecords}>
        {/* pass down the list of filtered records; searchbar will handle filtering and resetting to full record list if search is empty */}
        <RecordContainer
          filteredRecords={filteredRecords}
          testRecords={testRecords}
        />
      </div>
    </div>
  );

};


export default HomePage;