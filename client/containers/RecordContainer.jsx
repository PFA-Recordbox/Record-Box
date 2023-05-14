import React from 'react';
import Record from '../components/Record.jsx';

export default function RecordContainer({ userRecords }){

  const recordArray = [];
  console.log('test');
  // iterate through userRecords array
  for (let i = 0; i < userRecords.length; i++){
    // extract website, userID and password from each record into a new Record Component
    console.log(userRecords[i]);
    const { website, userName, password } = userRecords[i];
    console.log(website, userName, password);
    // push Record to recordArray
    recordArray.push(<Record website={website} userName={userName} password={password}/>)
  }

  return (
    <div id="recordcontainer">
      {/* <div id="recordsHeader">Records</div> */}
      {recordArray}
    </div>
  )
}
