import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function AddRecordModal({ showAddModal, setShowAddModal, retrieveRecords }) {

  if (!showAddModal) {
    return (null);
  }

  const addRecord = async (e) => {
    e.preventDefault();
    // gathers input data
    const web = document.getElementById('add-website');
    const user = document.getElementById('add-username');
    const pass = document.getElementById('add-password');
    const reqObj = {
      website: web.value,
      username: user.value,
      password: pass.value,
    };
    try {
      const response = await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(reqObj)
      })
      const responseStatus = await response.status;
      if (responseStatus === 201) {
        retrieveRecords();
        alert('Record Added Successfully!');
      }
      return;
    } catch (err) {
      return `Error encountered when trying to add record. Error: ${err}`;
    }
    
  }

  return (
    <div className='modals' >
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title' >Add A New Record</h4>
        </div>
        <div className='modal-body'>
          <form id='add-record-form'>
            <input id='add-website' type='text' placeholder='Website Name'></input>
            <input id='add-username' type='text' placeholder='Username'></input>
            <input id='add-password' type='text' placeholder='Password'></input>
          </form>
        </div>
        <div className='modal-footer'>
          <button className='primary-button' onClick={(e)=> addRecord(e)}>Submit</button>
          <button className='secondary-button' onClick={()=> setShowAddModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddRecordModal;
