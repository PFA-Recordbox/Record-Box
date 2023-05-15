import React, { useState } from "react";

function InfoModal({ showInfoModal, setShowInfoModal, currentRecord, retrieveRecords }) {
  if (!showInfoModal) {
    return (null);
  }
  // destructure the data for sending the delete request
  const { website, username, password } = currentRecord;
  
  const deleteRecord = async (e) => {
    e.preventDefault();

    const confirmDelete = confirm(
      'ATTENTION: This action cannot be undone. Do you want to delete this record?'
      );
    
    if (confirmDelete) {
      const reqObj = {
        website: website,
        username: username,
        password: password,
      };
      try {
        const response = await fetch('/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reqObj),
        });
        const responseStatus = await response.status;
        if (responseStatus === 201) {
          retrieveRecords();
          alert('Record Deleted!');
        }
        return;
      } catch (err) {
        return `Error when deleting record. Error: ${err}`;
      }
    }
    return;
  };



  return (
    <div className='modals'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>Record Information</h4>
        </div>
        <div className='modal-body'>
          <h6>Website: {website}</h6>
          <h6>Username: {username}</h6>
          <h6>Password: {password}</h6>
        </div>
        <div className='modal-footer'>
          <button id='edit-button'>Edit Record</button>
      <button id='delete-button' onClick={(e) => deleteRecord(e)}>
        <span className='material-symbols-outlined'>delete</span>
      </button>
      <button id='back-button' onClick={()=> setShowInfoModal(false)}>Go Back</button>
        </div>
      </div>
    </div>
  );

  

}

export default InfoModal