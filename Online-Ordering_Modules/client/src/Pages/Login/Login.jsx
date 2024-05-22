import "./Login.css";
import {Link} from 'react-router-dom';
import { useState } from "react";
import CucinaDeMarquina from '../../assets/Icons/cucina-de-marquina-logo.png';

const Login = () => {
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
            <Link to={`https://www.facebook.com/CucinaDeMarquina?mibextid=ZbWKwL`}>
              <div className="container-logo">
                <img src={CucinaDeMarquina} alt={CucinaDeMarquina} width={150} height={150}/>
              </div>
            </Link>
            <h2>Log In</h2>

            <div className="form">
              <div className="inputBox">
                <input type="text" required /> <i>Username</i>
              </div>

              <div className="inputBox">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    required
                  />
                  <i>Password</i>
                  <span className="show-password">
                    <i
                      className={`bx ${
                        passwordVisible ? "bx-low-vision" : "bx-show"
                      }`}
                      onClick={togglePassword}
                    ></i>
                  </span>
                </div>

              <div className="links">
                <a href="#">Remeber Me <input type="checkbox"/></a> <a href="#">Forgot Password</a>
              </div>

              <div className="inputBox">
                <input type="submit" value="Login" />
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
    </>
  );
};

export default Login;
