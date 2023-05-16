import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

function SettingsModal({ userCreds, showSettingsModal, setShowSettingsModal }) {

  if (!showSettingsModal) {
    return null;
  }

  return (
    <div className='modals'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h4 className='modal-title'>User Settings</h4>
        </div>
        <div className='modal-body'>
          <h4>{userCreds.username}</h4>
          <p>More profile info will go here...</p>
        </div>
        <div className='modal-footer'>
          <button className='primary-button' onClick={() => setShowSettingsModal(false)}>Go Back</button>
          <button className='secondary-button'>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
