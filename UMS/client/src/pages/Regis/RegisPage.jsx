import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./RegisPageStyle.css"

const RegisPage = () => {

  const notify = () => toast("Registration Successful!");
  const notifyError = () => toast("⚠️ Account already exists!", {
    theme: "dark"
  });

  const [formData, setFormData] = useState({
    account_firstName: '',
    account_lastName: '',
    account_username: '',
    account_pass: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log(response.data.message);
      notify();
      // Optionally, redirect user or display success message
    } catch (error) {
      console.error('Error registering user:', error);
      notifyError();
    }
  };

  const loginText = "Already have an account?";

  return (
    <div>

      <ToastContainer style={{ position: "absolute" }} />

      <div className="main">

        <div className="login-box">

          <div className="login-section">
            
            <div className="login-box-container">
              
                <div className="header-section">
                  <span>Sign Up</span>
                </div>

                <div className="input-section">

                <div className="input-box-section">
                    <div className="input-box-label">Username</div>
                    <div className="input-box"><input type="text" name="account_username" value={formData.account_username} onChange={handleChange} /></div>
                  </div>

                  <div className="input-box-section">
                    <div className="input-box-label">First Name</div>
                    <div className="input-box"><input type="text" name="account_firstName" value={formData.account_firstName} onChange={handleChange} /></div>
                  </div>

                  <div className="input-box-section">
                    <div className="input-box-label">Last Name</div>
                    <div className="input-box"><input type="text" name="account_lastName" value={formData.account_lastName} onChange={handleChange} /></div>
                  </div>

                  <div className="input-box-section">
                    <div className="input-box-label">Password</div>
                    <div className="input-box"><input type="password" name="account_pass" value={formData.account_pass} onChange={handleChange} /></div>
                  </div>

                  <div className="button-section">
                    <div className="button" onClick={handleSubmit}>Register</div>
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
                        <span>{loginText}</span>
                        <div className="login-button">Log In</div>
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

export default RegisPage