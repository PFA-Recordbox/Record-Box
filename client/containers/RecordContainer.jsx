import React from 'react';
import Record from '../components/Record.jsx';

export default function RecordContainer({ filteredRecords, testRecords, retrieveRecords, setShowInfoModal, setCurrentRecord }) {
  // initialize an array for rendering
  const recordArray = [];
  console.log('test');
  // iterate through userRecords array
  for (let i = 0; i < filteredRecords.length; i++) {
    // extract website, userID and password from each record into a new Record Component
    console.log(filteredRecords[i]);
    const { website, username, password } = filteredRecords[i];
    console.log(website, username, password);
    // push Record to recordArray
    recordArray.push(
      <Record
        key={i}
        website={website}
        username={username}
        password={password}
        retrieveRecords={retrieveRecords}
        setShowInfoModal={setShowInfoModal}
        setCurrentRecord={setCurrentRecord}
      />
    );
  }

  return (
    <div id='recordcontainer'>
      {/* <div id="recordsHeader">Records</div> */}
      {recordArray}
    </div>
  );
}
