// Import necessary modules and models
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import Accounts from '../models/accountsModel.js';

// Secret key for JWT token
const secretKey = '1234';

// Temporary storage for one-time codes (for demonstration purposes, use a proper storage mechanism in production)
const oneTimeCodes = new Map();

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
const generateVerificationToken = (email, code) => {
    return jwt.sign({ email, code }, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

// Function to send email verification link with token and one-time code
export const sendVerificationEmail = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Decode the token to get the user's email
        const { email } = jwt.verify(token, secretKey);

        // Generate a random 6-digit one-time code
        const code = Math.floor(100000 + Math.random() * 900000);

        // Store the code along with the user's email in temporary storage
        oneTimeCodes.set(email, code);

        // Generate a verification token containing the user's email and one-time code
        const verificationToken = generateVerificationToken(email, code);

        // Compose the email
        const mailOptions = {
            from: 'web.versatily@gmail.com', // Your Gmail email address
            to: email,  
            subject: 'Account Verification',
            html: `Your one-time verification code is: <strong>${code}</strong>. Use this code to verify your account.`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to send verification email' });
    }
};

// Function to verify account using JWT token and one-time code
export const verifyAccount = async (req, res) => {
    const { token, code } = req.body;

    if (!token || !code) {
        return res.status(400).json({ error: 'Token and code are required' });
    }

    try {
        // Verify and decode the JWT token
        const decodedToken = jwt.verify(token, secretKey);

        // Extract the user's email and one-time code from the decoded token
        const { email } = decodedToken;

        // Verify if the provided code matches the stored code
        const storedCode = oneTimeCodes.get(email);
        if (parseInt(code, 10) !== storedCode) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Find the user by email
        const user = await Accounts.findOne({ where: { account_email: email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user's account verification status
        await user.update({ isAccountVerified: true });

        // Remove the used one-time code from temporary storage
        oneTimeCodes.delete(email);

        res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to verify account' });
    }
};
