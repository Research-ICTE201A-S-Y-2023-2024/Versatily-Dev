import "./AuthPageStyle.css"

const AuthPage = () => {

  const registrationText = "Don't have an account?";

  return (
    <div>

      <div className="main">

        <div className="login-box">

          <div className="login-section">
            
            <div className="login-box-container">
              
                <div className="header-section">
                  <span>Login</span>
                </div>

                <div className="input-section">

                  <div className="input-box-section">
                    <div className="input-box-label">Username</div>
                    <div className="input-box"><input type="text" name="" id="" /></div>
                  </div>

                  <div className="input-box-section">
                    <div className="input-box-label">Password</div>
                    <div className="input-box"><input type="password" name="" id="" /></div>
                  </div>

                  <div className="button-section">
                    <div className="button">Login</div>
                  </div>

                </div>

            </div>

          </div>

          <div className="registration-section">

              <div className="registration-container">

                <div className="logo-section">

                  <div className="logo-container">
                    
                    <div className="logo-text">Versatily</div>
                    
                    <div className="logo-image-section">
                      <div className="logo"></div>
                    </div>
                  
                  </div>

                </div>

                <div className="registration-content-section">

                  <div className="registration-textholder-container">

                      <div className="textholder-header-section">
                        <span>Welcome to</span>
                      </div>

                      <div className="textholder-section">
                        <span>STI MARIKINA <br/> EXPOSITION </span>
                      </div>

                      <div className="login-button-section">
                        <span>{registrationText}</span>
                        <div className="login-button">Sign Up</div>
                      </div>

                  </div>

                </div>

              </div>

          </div>

        </div>
        
      </div>

    </div>
  )
}

export default AuthPage