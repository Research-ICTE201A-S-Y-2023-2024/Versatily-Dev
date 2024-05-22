import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import CucinaDeMarquina from '../../assets/Icons/cucina-de-marquina-logo.png';

const Register = () => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePassword1 = () => {
    console.log("trigger shit");
    setPasswordVisible1(!passwordVisible1);
  };

  const togglePassword2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  return (
    <>
      <div className="container-register-form">
        <div className="register-form">
          <div className="signup">
            <div className="content">
            <Link to={`https://www.facebook.com/CucinaDeMarquina?mibextid=ZbWKwL`}>
              <div className="container-logo">
                <img src={CucinaDeMarquina} alt={CucinaDeMarquina} width={150} height={150}/>
              </div>
            </Link>
              <h2>Sign Up</h2>

              <div className="form">
                <div className="inputBox">
                  <input type="tel" required /> <i>Phone Number </i>
                </div>

                <div className="full-name-form">
                  <div className="inputBox">
                    <input type="text" required /> <i>First Name </i>
                  </div>

                  <div className="inputBox">
                    <input type="text" required /> <i>Last Name </i>
                  </div>
                </div>

                <div className="inputBox">
                  <input type="text" required /> <i>Email </i>
                </div>

                <div className="inputBox">
                  <input
                    type={passwordVisible1 ? "text" : "password"}
                    required
                  />
                  <i>New Password</i>
                  <span className="show-password">
                    <i
                      className={`bx ${
                        passwordVisible1 ? "bx-low-vision" : "bx-show"
                      }`}
                      onClick={togglePassword1}
                    ></i>
                  </span>
                </div>

                <div className="inputBox">
                  <input
                    type={passwordVisible2 ? "text" : "password"}
                    required
                  />
                  <i>Confirm Password</i>
                  <span className="show-password">
                    <i
                      className={`bx ${
                        passwordVisible2 ? "bx-low-vision" : "bx-show"
                      }`}
                      onClick={togglePassword2}
                    ></i>
                  </span>
                </div>

                <div className="inputBox">
                  <input type="submit" value="Register" />
                </div>

                <div className="links-register">
                  Already have an account?
                  <Link to={"/login"}> login here</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
