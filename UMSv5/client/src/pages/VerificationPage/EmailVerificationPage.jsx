import './EmailVerificationPage.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [accountEmail, setAccountEmail] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) blurEmail(token);
    }, []);

    const blurEmail = async (token) => {
        try {
            const response = await axios.post('http://localhost:5001/blur-email', { token });
            const { blurredEmail } = response.data;
            setAccountEmail(blurredEmail);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const sendVerificationEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            await axios.post('http://localhost:5001/send-email-verification', { token });
            navigate('/email/verify-code');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
    <>

        <div className="ums-evp-main">
            <div className="ums-evp-email-verification-section">
                <div className="ums-evp-email-verification-content">
                    <div className="ums-evp-email-verification-logo-section">
                        <div className="ums-evp-email-verification-logo">
                            <i className="fi fi-rs-envelope-ban"></i>
                        </div>
                    </div>
                    <div className="ums-evp-email-verification-text-section">
                        <span>Email has not been verified</span>
                        <br/>
                        <span>Send a verification email to {accountEmail}</span>
                    </div>
                </div>
                <div className="ums-evp-email-verification-dir-section">
                    <div className="ums-evp-email-verification-button-section">
                        <button onClick={sendVerificationEmail}>Send Verification Email</button>

                    </div>

                </div>

            </div>
            
        </div>

    </>
        
    );
};

export default EmailVerificationPage;
