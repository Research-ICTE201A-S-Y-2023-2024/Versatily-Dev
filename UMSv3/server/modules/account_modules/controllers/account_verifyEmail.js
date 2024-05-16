import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Accounts from '../models/accountsModel.js';

// Secret key for JWT token
const secretKey = '1234';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    auth: {
        user: '74ed40001@smtp-brevo.com', // Your Gmail email address
        pass: 'OxYnH6cvX5PFUBD9' // Your Gmail password
    },
    port: 587,
    secure: false,
});

// Function to generate JWT token with user's email
const generateVerificationToken = (email) => {
    return jwt.sign({ email }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to send email verification link with token
export const sendVerificationEmail = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {

        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, secretKey);

        // Extract the user's email from the decoded token
        const { email } = decodedToken;

        // Generate a verification token containing the user's email
        const verificationToken = generateVerificationToken(email);

        // Construct the verification link with the token
        const verificationLink = `http://localhost:5001/verify-account?token=${verificationToken}`;

        // Compose the email
        const mailOptions = {
            from: 'web.versatily@gmail.com', // Your Gmail email address
            to: email,  
            subject: 'Account Verification',
            html: `Click <a href="${verificationLink}">here</a> to verify your account.`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send verification email' });
    }
};

// Function to verify account using JWT token
export const verifyAccount = async (req, res) => {
    const { token } = req.query;
  
    try {
      // Verify and decode the JWT token
      const decodedToken = jwt.verify(token, secretKey);
  
      // Extract the user's email from the decoded token
      const { email } = decodedToken;
  
      // Find the user by email
      const user = await Accounts.findOne({ where: { account_email: email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update the user's account verification status
      await user.update({ isAccountVerified: true });
  
      // Redirect user to specified URL after verification
      res.redirect('http://localhost:3001');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to verify account' });
    }
  };