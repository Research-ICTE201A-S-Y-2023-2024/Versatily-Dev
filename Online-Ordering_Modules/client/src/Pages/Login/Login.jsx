import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import CucinaDeMarquina from '../../assets/Icons/cucina-de-marquina-logo.png';

const Login = () => {
  const toastConfig = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  };

  const navigate = useNavigate();

  const [loginformData, setLoginFormData] = useState({
    emailOrUsername: '',
    account_password: '',
  });

  const handleChange = (e) => {
    setLoginFormData({ ...loginformData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginformData.emailOrUsername || !loginformData.account_password) {
      toast.error('Please enter both email/username and password', toastConfig);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        loginformData,
      );
      const { message, token } = response.data;
      console.log(message, token);

      // Save JWT token securely
      localStorage.setItem('token', token);

      toast.success(
        'Successfully logged in! Redirecting to order pages',
        toastConfig,
      );
      setTimeout(() => {
        navigate('/orders');
      }, 2100);
    } catch (error) {
      toast.error('Login failed: ' + error.response.data.message, toastConfig);
    }
  };

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      <div className="container-login-form">
        <div className="login-form">
          <div className="signin">
            <div className="content">
              <Link
                to={'https://www.facebook.com/CucinaDeMarquina?mibextid=ZbWKwL'}
              >
                <div className="container-logo">
                  <img
                    src={CucinaDeMarquina}
                    alt={CucinaDeMarquina}
                    width={150}
                    height={150}
                  />
                </div>
              </Link>
              <h2>Log In</h2>

              <div className="form">
                <div className="inputBox">
                  <input
                    type="text"
                    required
                    name="emailOrUsername"
                    value={loginformData.emailOrUsername}
                    onChange={handleChange}
                  />{' '}
                  <i>Username</i>
                </div>

                <div className="inputBox">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    name="account_password"
                    value={loginformData.account_password}
                    onChange={handleChange}
                    required
                  />
                  <i>Password</i>
                  <span className="show-password">
                    <i
                      className={`bx ${
                        passwordVisible ? 'bx-low-vision' : 'bx-show'
                      }`}
                      onClick={togglePassword}
                    ></i>
                  </span>
                </div>

                <div className="links">
                  <a href="#">
                    Remeber Me <input type="checkbox" />
                  </a>{' '}
                  <a href="#">Forgot Password</a>
                </div>

                <div className="inputBox">
                  <input onClick={handleSubmit} type="submit" value="Login" />
                </div>

                <div className="links-register">
                  Dont have an account?
                  <Link to={'/register'}> resgister here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
