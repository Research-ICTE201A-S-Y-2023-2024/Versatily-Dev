import React, { useState } from 'react';
import './RegDashboardStyles.css';

const RegDashboard = () => {
  const [clickedButton, setClickedButton] = useState(null);

  const handleButtonClick = (role) => {
    setClickedButton(role);
    setTimeout(() => {
      setClickedButton(null);
      alert(`Logged in as ${role}`);
    }, 200); // Simulate a delay for the animation
  };

  return (
    <div className="ums-evp-main">
      <div className="ums-evp-role-selection-section">
        <div className="ums-evp-role-content">
          <div className="ums-evp-text-section">
            <span>Welcome User[username]!</span>
            <span>It seems your account has multiple roles, which would you like to log into?</span>
          </div>
        </div>
        <div className="ums-evp-dir-section ">
          <div className="ums-evp-button-section">
            <button
              className={`role-button admin ${clickedButton === 'POS Admin' ? 'clicked' : ''}`}
              onClick={() => handleButtonClick('POS Admin')}
            >
              POS Admin
            </button>
            <button
              className={`role-button staff ${clickedButton === 'POS Staff' ? 'clicked' : ''}`}
              onClick={() => handleButtonClick('POS Staff')}
            >
              POS Staff
            </button>
            <button
              className={`role-button user ${clickedButton === 'Regular User' ? 'clicked' : ''}`}
              onClick={() => handleButtonClick('Regular User')}
            >
              Regular User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegDashboard;