import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WelcomePageStyles.css';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ userEmail }) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        account_firstName: '',
        account_lastName: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Form Data:", formData);
            const response = await axios.post('http://localhost:5001/update-name',{
                account_firstName: formData.account_firstName,
                account_lastName: formData.account_lastName
            });
            console.log(response.data.message);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error('Error updating name to user:', error);
        }
    };

    return (
        <div className="ums-evp-main">
            <div className="ums-evp-email-verification-section">
                <div className="welcome-header"></div>
                <div className="profile-pic"></div>
                <div className="ums-evp-email-verification-text-section">
                    <h1>Welcome User!</h1>
                    <span>Your email was successfully verified.</span>
                </div>
                <form className="welcome-form" onSubmit={handleSubmit}>
                    <label htmlFor="account_firstName">First name</label>
                    <input type="text" id="account_firstName" name="account_firstName"  value={formData.account_firstName} onChange={handleChange} autoComplete="off" required/>
                    <label htmlFor="account_lastName">Last name</label>
                    <input  type="text"  id="account_lastName" name="account_lastName" value={formData.account_lastName} onChange={handleChange} autoComplete="off" required/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WelcomePage;
