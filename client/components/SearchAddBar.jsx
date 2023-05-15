import React, { useState } from "react";

export default function SearchAddBar({ userRecords, setUserRecords, setFilteredRecords }){

  // onchange functionality that updates with most recent text
    // then use that current search value to filter through the userRecords
    // set the FilteredRecords state to the resulting filtered records
    // the state change on the filtered records will fire a re-render that will update the values our RecordContainer is rendering
  const filterRecords = () => {
    const searchInput = document.getElementById('searchbar');
    const text = searchInput.value;
    // initalize an array to hold filtered material

    // loop through userRecords object? array?
    for (const prop in userRecords) {
      // identify if the search text matches the 
    }

    // 





  };

  
  // the create button record could redirect with <Link /> or if we get modals working to pop one up...
    // the add record's "submit" button will need to send a patch/put request to add info to the database
    // that same submit will also need to setUserRecords so we change state and fire a re-render with the new record included in the list


  return (
    <div id="searchaddbar">
    <form id="search-input">
        <input id="searchbar" inputType="text" placeholder="Search..." onChange={filterRecords}></input>
      {/* <button id="newrecord">Create Record</button> */}
    </form>
      
    </div>
  )
}