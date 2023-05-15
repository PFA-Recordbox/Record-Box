import React, { useState } from "react";



export default function Record({ website, userName, password, retrieveRecords}){
  const [hidden, setHidden] = useState(true);

  const handleToggle = () => {
    setHidden(!hidden);
  }

  const deleteRecord = async (e) => {
    e.preventDefault();
    
    const confirmDelete = confirm('ATTENTION: This action cannot be undone. Do you want to delete this record?');
    if (confirmDelete) {
      const reqObj = {
        website: website,
        username: userName,
        password: password,
      };
      try {
        const response = await fetch('/delete', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(reqObj)
        })
        const responseStatus = await response.status;
        if (responseStatus === 201) {
          retrieveRecords();
          alert('Record Deleted!')
        }
        return;
      } catch (err) {
        return `Error when deleting record. Error: ${err}`
      }
    }
    return;
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
          <input type={hidden ? "password" : "text"} value={userName} id="password"/>
        </div>
        <div className="eachRecordHeader">
          <button onClick={handleToggle} id="toggle">Password</button>
          <input type={hidden ? "password" : "text"} value={password} id="password"/>
        </div>
      </div>
      <div>
        <button id='delete-record' onClick={(e) => deleteRecord(e)}><span class="material-symbols-outlined">info</span></button>
      </div>
    </div>
  )
}







