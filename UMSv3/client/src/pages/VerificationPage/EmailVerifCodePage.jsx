import './EmailVerificationPage.css'

const EmailVerifCodePage = () => {
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

                        <span>Check your email for the code</span>
                        
                        <span>Sent a verification code to test@email.com</span>

                    </div>
                </div>

                <div className="ums-evp-email-verification-dir-section">

                    <div className="ums-evp-email-verification-button-section">
                        <button>Send Verification Email</button>
                    </div>

                </div>
            </div>

        </div>
    </>
  )
}

export default EmailVerifCodePage