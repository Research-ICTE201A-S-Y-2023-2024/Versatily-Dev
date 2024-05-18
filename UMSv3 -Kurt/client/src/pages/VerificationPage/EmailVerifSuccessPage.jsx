// src/components/EmailVerificationPage.jsx
import './EmailVerificationPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerificationPage = () => {
    const navigate = useNavigate();

    const movetonext = () =>{
        navigate('/home/welcome-user')
      }

    return (
        <div className="ums-evp-main">
            <div className="ums-evp-email-verification-section">
                <div className="ums-evp-email-verification-content">
                    <div className="ums-evp-email-verification-logo-section">
                        <div className="ums-evp-email-verification-logo">
                        <i class="fi fi-rs-check-circle"></i>
                        </div>
                    </div>
                    <div className="ums-evp-email-verification-text-section">
                        <span>Email Verified</span>
                        <br/>
                        <span>Your email was successfully verified.</span>
                    </div>
                    <div className="ums-evp-email-verification-button-section">
                    <button onClick={movetonext}>Next</button>

                </div>

                </div>

            </div>

        </div>
    );
};
export default EmailVerificationPage;