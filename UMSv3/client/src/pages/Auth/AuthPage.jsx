/* eslint-disable react/no-unescaped-entities */
import "./AuthPageStyle.css"
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify' 
import axios from 'axios'

const AuthPage = () => {

  const notifyLoginError = () => {
    if (!isToastDisplayed) {
      toast.error('Failed to Login. Please try again.', {
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

  const notifyLoginSuccess = () => {
    if(!isToastDisplayed){
      toast.success('Login Success!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onOpen: () => setIsToastDisplayed(true),
        onClose: () => setIsToastDisplayed(false)
      })
    }
  }

  //Determines whether a toast is displayed or not
  const [isToastDisplayed, setIsToastDisplayed] = useState(false)

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () =>{
    setShowPassword(!showPassword)
  }

  const [loginformData, setLoginFormData] = useState({
    emailOrUsername: '',
    account_password: '',
  });

  const handleChange = (e) => {
    setLoginFormData({ ...loginformData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!isToastDisplayed){
        console.log('Login Form Data: ', loginformData)
        const response = await axios.post('http://localhost:5001/login', loginformData);
        const { message, token } = response.data;
        console.log(message);
        // Save JWT token to local storage
        localStorage.setItem('token', token);
        // Redirect user to dashboard
        notifyLoginSuccess()
        setTimeout(() => {
          navigate("/admin/accounts");
        }, 2100)
      }
    } catch (error) {
      console.error('Error signing in user:', error);
      notifyLoginError()
    }
  };

  const moveToRegistration = () =>{
    navigate('/register')
  }

  return (
    <>

      <ToastContainer></ToastContainer>

      <div className="ums-ap-main">
        
        <div className="ums-ap-login-section">

          <div className="ums-ap-login-section-overlay">

          </div>

          <div className="ums-ap-registration-dir-overlay">

          </div>

          <div className="ums-ap-login-section-container">

            <div className="ums-ap-login-form-section">

              <form className="ums-ap-login-form">

                <div className="ums-ap-login-form-header-section">
                  <span>Login</span>
                </div>

                <div className="ums-ap-login-form-container">

                  <div className="ums-ap-login-form-container-username-section">

                    <div className="ums-ap-username-section-input-label-section">
                      <span>Username or Email</span>
                    </div>

                    <div className="ums-ap-username-section-input-section">
                      <input type="text" name="emailOrUsername" value={loginformData.emailOrUsername} onChange={handleChange}/>
                    </div>

                  </div>

                  <div className="ums-ap-login-form-container-password-section">

                    <div className="ums-ap-password-section-input-label-section">
                      <span>Password</span><i className="fi fi-tr-low-vision" onClick={togglePassword}></i>
                    </div>

                    <div className="ums-ap-password-section-input-section">
                      <input type={showPassword ? 'text' : 'password'} name="account_password" value={loginformData.account_password} onChange={handleChange}/>
                      <div className="ums-ap-password-forgot-button-section">
                        <span>Forgot your account?</span>
                      </div>
                    </div>
                    
                  </div>

                  <div className="ums-ap-login-form-button-section">
                    <button className="ums-ap-form-login-button" onClick={handleSubmit}>Login</button>
                  </div>

                </div>

              </form>

            </div>

            <div className="ums-ap-registration-dir-section">

              <div className="ums-ap-registration-dir-container">

                <div className="ums-ap-registration-dir-container-logo-section">
                  
                  <span>V</span>

                </div>

                <div className="ums-ap-registration-dir-content-section">

                  <div className="ums-ap-registration-dir-content-text-section">

                    <div className="ums-ap-registration-dir-content-text">
                      <span>Welcome To</span>
                    </div>
                    
                    <div className="ums-ap-registration-dir-content-text">
                      <span>STI COLLEGE MARIKINA EXPOSITION</span>
                    </div>

                  </div>

                  <div className="ums-ap-registration-dir-content-reg-section">

                    <div className="ums-ap-registration-dir-content-reg-section-text">
                      <span>Don't have an account?</span>
                    </div>

                    <div className="ums-ap-registration-dir-content-reg-section-button">
                      <button onClick={moveToRegistration}>Sign Up</button>
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

export default AuthPage