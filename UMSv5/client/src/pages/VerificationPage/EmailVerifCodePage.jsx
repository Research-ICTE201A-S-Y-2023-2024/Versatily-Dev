import './EmailVerificationPage.css';
import { useState, useEffect, useRef } from 'react';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerifCodePage = () => {
    const navigate = useNavigate();
    const [accountEmail, setAccountEmail] = useState('');
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const intervalRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) blurEmail(token);

        if (timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }

        return () => clearInterval(intervalRef.current);
    }, [timer]);

    const blurEmail = async (token) => {
        try {
            const response = await axios.post('http://localhost:5001/blur-email', { token });
            const { blurredEmail } = response.data;
            setAccountEmail(blurredEmail);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const notify = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
    }

    const verifyCode = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            const response = await axios.post('http://localhost:5001/verify-account', { token, code });
            if (response.data.message === 'Account verified successfully') {
                notify('User successfully verified!');
    
                // Extract the user's email from the response
                const userEmail = response.data.email;
    
                // Navigate to the WelcomePage component and pass the user's email as a state
                navigate('/email/verify-success', { state: { userEmail } });
            } else {
                notifyError('Verification code error. Incorrect verification code.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    const resendCode = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            await axios.post('http://localhost:5001/send-email-verification', { token });
            setCanResend(false);
            setTimer(30);
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            notify('Verification code resent.');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
             <ToastContainer />
             
        <div className="ums-evp-main">
                    <div className="ums-evp-email-verification-section">
                        <div className="ums-evp-email-verification-content">
                            <div className="ums-evp-email-verification-logo-section">
                                <div className="ums-evp-email-verification-logo">
                                    <i className="fi fi-rr-envelope"></i>
                                </div>
                            </div>
                            <div className="ums-evp-email-verification-text-section">
                                <span>Check the email that's associated with your account for the verification code.</span>
                                <br/>
                                <span>Sent a verification code to {accountEmail}</span>
                            </div>
                        </div>
                        <div className="ums-evp-email-verification-dir-section">
                            <span>Verification Code</span>
                            <input type="text" name="account_code" value={code} onChange={handleCodeChange} autoComplete="off" required />
                            <div className="ums-evp-email-verification-button-section">
                                <button onClick={verifyCode}>Verify</button>
                                <button className='resend' onClick={resendCode} disabled={!canResend}>Resend</button>

                            </div>

                        </div>

                    </div>

                </div>
        </>
    );
};

export default EmailVerifCodePage;
