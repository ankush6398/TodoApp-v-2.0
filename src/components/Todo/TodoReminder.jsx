import React from 'react';

const PopupReminder = ({ reminder, onClose }) => {
  return (
    <div className="popup-reminder">
      <p>{reminder}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopupReminder;