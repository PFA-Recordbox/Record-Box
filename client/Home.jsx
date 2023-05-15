import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import SearchContainer from './containers/SearchContainer.jsx';
import RecordContainer from './containers/RecordContainer.jsx';
import createTestData from './testdata.js';
import AddRecordModal from './components/Modals/AddRecordModal.jsx';
import SettingsModal from './components/Modals/SettingsModal.jsx';

function HomePage({ userCreds, validUser }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!validUser) {
  //     navigate('login');
  //   }
  // }, [navigate, validUser]);
  
  /* define unfiltered records from database in state so searchcontainer can access them 
  We won't modify them in the searchcontainer, just use them as reference*/
  const [userRecords, setUserRecords] = useState(createTestData());
  /* create filtered records in state so we can render them 
  in the RecordContainer dynamically */
  const [filteredRecords, setFilteredRecords] = useState(createTestData());
  
  const testRecords = createTestData();
  
  // retrieve records for current user; this fires on page load
  // **** ARE WE USING A SESSION COOKIE ONCE THE USER IS VALIDATED AND LOGS IN?? *****
  const retrieveRecords = async () => {
    try {
      const response = await fetch('/')
      // define response status
      const responseStatus = await response.status;
      // take user datastream and turn into usable js code
      const records = await response.json();
      // ***** CHECK IF SERVER IS SENDING BACK PROPER STATUS CODE *****
      if (responseStatus === 200) {
        // if response status is good, setUserRecords and setFilteredRecords with data
        setUserRecords(records.data);
        setFilteredRecords(records.data);
      }
      return;
    } catch (err) {
      return `Error with retrieving user records in Home Page. Error: ${err}.`
    }
  }

  return (
    <div id='HomePage' onLoad={retrieveRecords}>
      <div id='search-container'>
        {/* pass down the full list of original records and setUserRecords since we want a re-render to show the added entries;
        Also the ability to setFilteredRecords so the records will re-render on the state change based on the filter */}
        <SearchContainer
          userRecords={userRecords}
          setUserRecords={setUserRecords}
          setFilteredRecords={setFilteredRecords}
        />
      </div>
      <div id='record-container'>
        {/* pass down the list of filtered records; searchbar will handle filtering and resetting to full record list if search is empty */}
        <RecordContainer
          filteredRecords={filteredRecords}
          testRecords={testRecords}
          retrieveRecords={retrieveRecords}
        />
        <div id='home-modals'>
          <SettingsModal
            userCreds={userCreds}
            showSettingsModal={showSettingsModal}
            setShowSettingsModal={setShowSettingsModal}
          />
          <AddRecordModal
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            retrieveRecords={retrieveRecords}
          />
        </div>
      </div>
      <div id='navbar'>
        <div id="recordbox">Recordbox</div>
        <div id='settings-modal'>
<<<<<<< HEAD
          <button id='show-settings-button' onClick={()=> setShowSettingsModal(true)}><span class="material-symbols-outlined">more_vert</span></button>
          <SettingsModal userCreds={userCreds} showSettingsModal={showSettingsModal} setShowSettingsModal={setShowSettingsModal}/>
        </div>
        <div id='add-record-modal'>
          <button id='add-record-button' onClick={()=>setShowAddModal(true)}><span class="material-symbols-outlined">add</span></button>
          <AddRecordModal setUserRecords={setUserRecords} showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
=======
          <button id='show-settings-button' onClick={() => setShowSettingsModal(true)}>...</button>
        </div>
        <div id='add-record-modal'>
          <button id='add-record-button' onClick={() => setShowAddModal(true)}>+</button>
>>>>>>> dev
        </div>
      </div>
    </div>
  );

};


export default HomePage;