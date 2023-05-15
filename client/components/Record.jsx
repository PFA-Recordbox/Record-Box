import React, { useState } from "react";



export default function Record({ website, userName, password, retrieveRecords}){
  const [hidden, setHidden] = useState(true);

  const handleToggle = () => {
    setHidden(!hidden);
  }

  const deleteRecord = async () => {
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
      <div className="eachRecordHeader">
        <p>Website:</p>
        <span>{website}</span>
      </div>
      <div className="eachRecordHeader">
        <button onClick={handleToggle} id="toggle">Username:</button>
        <input type={hidden ? "password" : "text"} value={userName} id="password"/>
      </div>
      <div className="eachRecordHeader">
        <button onClick={handleToggle} id="toggle">Password:</button>
        <input type={hidden ? "password" : "text"} value={password} id="password"/>
      </div>
      <div className='eachRecordHeader'>
        <button id='delete-record' onClick={deleteRecord}>Delete</button>
      </div>
    </div>
  )
}







