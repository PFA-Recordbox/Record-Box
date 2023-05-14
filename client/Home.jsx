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
  
  // retrieve records for current user using userCreds in fetch request
  // **** ARE WE USING A SESSION COOKIE ONCE THE USER IS VALIDATED AND LOGS IN?? *****
  const retrieveRecords = async () => {

    try {
      const response = await fetch('/home')
      const data = await response.json();

    } catch (err) {
      
    }


  }
    // if response status is good, setUserRecords and filtered records with data




  

    

  return (
    <div id="HomePage" onLoad={retrieveRecords}>
      <div id="search-container">
          <SearchContainer />
      </div>
      <div id="record-container">
          {/* make sure to pass down proper data */}
          <RecordContainer userRecords={testRecords}/>
      </div>
      {validUser ? null : <Redirect to='/login' />}
    </div>
  )

};


export default HomePage;