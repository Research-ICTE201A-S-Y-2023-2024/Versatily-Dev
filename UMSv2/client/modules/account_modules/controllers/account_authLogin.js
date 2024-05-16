import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import Accounts from "../models/accountsModel.js";

export const loginAccount = async (req, res) => {
    const secretKey = '1234';

    try {
        const { emailOrUsername, account_password } = req.body;
        
        // Find the user by email or username
        const user = await Accounts.findOne({ 
            where: { 
              [Op.or]: [
                { account_username: emailOrUsername }, 
                { account_email: emailOrUsername }
              ] 
            } 
          });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid email or username" });
        }

        // Log the retrieved user object to check if the password field is present
        console.log("Retrieved user:", user);

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(account_password, user.account_pass);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or username or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.account_email, username: user.account_username, account_role: user.account_role }, secretKey, {expiresIn: '3h'} );

        // If everything is okay, send a success response with JWT token
        res.status(200).json({ message: "Login successful", user: user, token: token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};