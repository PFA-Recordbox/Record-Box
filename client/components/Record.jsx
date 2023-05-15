import React, { useState } from "react";



export default function Record({ website, username, password, retrieveRecords, setShowInfoModal, setCurrentRecord}){
  const [hidden, setHidden] = useState(true);

  const handleToggle = () => {
    setHidden(!hidden);
  }

  const setCurrentRecordAndShowInfoModal = () => {
    setCurrentRecord({
      website: website,
      username: username,
      password: password,
    });
    setShowInfoModal(true);
  }

  return (
    <div className="eachRecord">
      <div className="recordInfo">
        <div id="website" className="eachRecordHeader">
          <div>Website</div>
          <div>{website}</div>
        </div>
        <div className="eachRecordHeader">
          <button onClick={handleToggle} id="toggle">Username</button>
          <input type={hidden ? "password" : "text"} value={username} id="password"/>
        </div>
        <div className="eachRecordHeader">
          <button onClick={handleToggle} id="toggle">Password</button>
          <input type={hidden ? "password" : "text"} value={password} id="password"/>
        </div>
      </div>
      <div>
        <button id='record-info' onClick={() => setCurrentRecordAndShowInfoModal()}><span class="material-symbols-outlined">settings</span>
        </button>
      </div>
    </div>
  )
}







