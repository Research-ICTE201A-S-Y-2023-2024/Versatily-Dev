/* eslint-disable react/no-unescaped-entities */
import "./RegPageStyle.css"
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import axios from 'axios'

const RegPage = () => {

  //Toasts

  const [isToastDisplayed, setIsToastDisplayed] = useState(false)

  const notifyPasswordNotMatch = () => {
    if (!isToastDisplayed) {
      toast.error('Passwords does not match.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onOpen: () => setIsToastDisplayed(true), 
        onClose: () => setIsToastDisplayed(false)
      });
    }
  }

  const notify = () => {
    if (!isToastDisplayed) {
      toast.success('User successfully registered!.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onOpen: () => setIsToastDisplayed(true), 
        onClose: () => setIsToastDisplayed(false)
      });
    }
  }

  const notifyError = () => {
    if (!isToastDisplayed) {
      toast.error('User failed to register. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onOpen: () => setIsToastDisplayed(true), 
        onClose: () => setIsToastDisplayed(false)
      });
    }
  }

  //Password visibility function
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () =>{
    setShowPassword(!showPassword)
  }

  //User Inputted Data Functions, request => server

  const [formData, setFormData] = useState({
    account_username: '',
    account_email: '',
    account_password: '',
    account_contactNo: '',
    isAccountVerified: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isToastDisplayed){
        try {
          console.log("Form Data:", formData);
          const response = await axios.post('http://localhost:5001/register', formData);
          console.log(response.data.message);
          notify();
          // Optionally, redirect user or display success message
        } catch (error) {
          console.error('Error registering user:', error);
          notifyError();
        }
    }
    else {
      notifyPasswordNotMatch();
    }
  };


  return (
    <>

    <ToastContainer></ToastContainer>
    
    <div className="ums-rp-main">

      <div className="ums-rp-registration-section">

        <div className="ums-rp-registration-section-overlay"></div>
        <div className="ums-rp-login-dir-overlay"></div>
        <div className="ums-rp-registration-section-container">

          <div className="ums-rp-registration-form-section">

            <form onSubmit={handleSubmit} className="ums-rp-registration-form">
                <div className="ums-rp-registration-form-header-section">
                  <span>Sign Up</span>
                </div>

                <div className="ums-rp-registration-form-container">

                  <div className="ums-rp-registration-form-container-left-section">

                    <div className="ums-rp-registration-form-input-section">

                      <div className="ums-rp-registration-form-input-label">
                        <span>Email</span>
                      </div>

                      <div className="ums-rp-registration-form-input">
                        <input type="text" name="account_email" value={formData.account_email} onChange={handleChange} autoComplete="off" required/>
                      </div>

                    </div>

                    <div className="ums-rp-registration-form-input-section">

                      <div className="ums-rp-registration-form-input-label">
                        <span>Contact No.</span>
                      </div>

                      <div className="ums-rp-registration-form-input">
                        <input type="number" name="account_contactNo" value={formData.account_contactNo} onChange={handleChange} autoComplete="off" required/>
                      </div>

                    </div>
                    
                  </div>

                  <div className="ums-rp-registration-form-container-right-section">

                    <div className="ums-rp-registration-form-input-section">
                      
                      <div className="ums-rp-registration-form-input-label">
                        <span>Username</span>
                      </div>

                      <div className="ums-rp-registration-form-input">
                        <input type="text" name="account_username" value={formData.account_username} onChange={handleChange} autoComplete="off" required/>
                      </div>
                    
                    </div>

                    <div className="ums-rp-registration-form-input-section">
                      
                      <div className="ums-rp-registration-form-input-label">
                        <span>Password</span><i className="fi fi-tr-low-vision" onClick={togglePassword}></i>
                      </div>

                      <div className="ums-rp-registration-form-input">
                        <input type={showPassword ? 'text' : 'password'} name="account_password" value={formData.account_password} onChange={handleChange} autoComplete="off" required/>
                      </div>
                    
                    </div>

                  </div>

                </div>

                <div className="ums-rp-registration-button-section">
                  <button className="ums-rp-registration-button" >Sign Up</button>
                </div>
            </form>

          </div>

          {/* This is the login directory section */}
          <div className="ums-rp-login-dir-section">

            <div className="ums-rp-login-dir-container">

              <div className="ums-rp-login-dir-container-logo-section">
                
                <span>V</span>

              </div>

              <div className="ums-rp-login-dir-content-section">

                <div className="ums-rp-login-dir-content-text-section">

                  <div className="ums-rp-login-dir-content-text">
                    <span>Welcome To</span>
                  </div>
                  
                  <div className="ums-rp-login-dir-content-text">
                    <span>STI COLLEGE MARIKINA EXPOSITION</span>
                  </div>

                </div>

                <div className="ums-rp-login-dir-content-log-section">

                  <div className="ums-rp-login-dir-content-log-section-text">
                    <span>Don't have an account?</span>
                  </div>

                  <div className="ums-rp-login-dir-content-log-section-button">
                    <button>Sign In</button>
                  </div>
                  
                </div>

              </div>

              </div>

            </div>

        </div>

      </div>

    </div>

    </>
  )
}

export default RegPage