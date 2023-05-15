import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function AddRecordModal({ setUserRecords, showAddModal, setShowAddModal }) {

  if (!showAddModal) {
    return (null);
  }

  const addRecord = (e) => {
    e.preventDefault();
    // gathers input data
    const web = document.getElementById()


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
          <button className='primary-button' onClick={(e)=> addRecord(e)}>Add Record</button>
          <button className='secondary-button' onClick={()=> setShowAddModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default AddRecordModal;
