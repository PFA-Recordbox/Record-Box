import React from "react";
import SearchAddBar from '../components/SearchAddBar.jsx';

export default function SearchContainer({userRecords, setUserRecords, setFilteredRecords}) {
  return (
    <div id='SearchContainer'>
      <SearchAddBar
        userRecords={userRecords}
        setUserRecords={setUserRecords}
        setFilteredRecords={setFilteredRecords}
      />
    </div>
  );
}