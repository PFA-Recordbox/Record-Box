import React, { useState } from "react";

function InfoModal({ showInfoModal, setShowInfoModal, currentRecord, retrieveRecords }) {
  const [editable, setEditable] = useState(false);


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

  const editRecord = async (e) => {
    e.preventDefault();
    const reqObj = {
      website: website,
      username: username,
      password: password,
    }

    try {
      const response = await fetch('/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqObj)
      })
      setEditable(false)
      return alert('Record edited successfully!')
    } catch (err) {
      return `Error editing the record. Error: ${err}.`
    }
  }


  if (editable) {
    const newDiv = (<form id='edit-form'>
      <input id='new-website'>Website: </input>
      <input id='new-username'>Username: </input>
      <input id='new-password'>Password: </input>
      <button id='send-edits' type='submit' onClick={(e) => editRecord(e)}>
        Submit Changes
      </button>
      <button id='cancel-changes' onClick={() => setEditable(false)}>
        Cancel
      </button>
    </form>);

  }


  return (
    <div className='modals'>
      <div className='modal-content'>
        <div id='info-title'>Record Information</div>
        <div className='modal-body'>
          <div id='record-info'>
            <div id='words'>
              <h6>website: {website}</h6>
              <h6>username: {username}</h6>
              <h6>password: {password}</h6>
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <button id='edit-button' onClick={() => setEditable(true)}>
            Edit Record
          </button>
          <button id='delete-button' onClick={(e) => deleteRecord(e)}>
            <span className='material-symbols-outlined'>delete</span>
          </button>
          <button id='back-button' onClick={() => setShowInfoModal(false)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );

  

}

export default InfoModal