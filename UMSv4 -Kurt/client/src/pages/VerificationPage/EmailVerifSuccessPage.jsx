import './EmailVerificationPage.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const EmailVerifSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const movetonext = () => {
        const userEmail = location.state?.userEmail;
        navigate('/home/welcome-user', { state: { userEmail } });
    };

    return (
        <div className="ums-evp-main">
            <div className="ums-evp-email-verification-section">
                <div className="ums-evp-email-verification-content">
                    <div className="ums-evp-email-verification-logo-section">
                        <div className="ums-evp-email-verification-logo">
                            <i className="fi fi-rs-check-circle"></i>
                        </div>
                    </div>
                    <div className="ums-evp-email-verification-text-section">
                        <span>Email Verified</span>
                        <br />
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

export default EmailVerifSuccessPage;
