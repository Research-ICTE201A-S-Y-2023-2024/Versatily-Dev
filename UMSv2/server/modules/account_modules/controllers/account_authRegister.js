import bcrypt from "bcrypt"
import Accounts from "../models/accountsModel.js"

export const registerAccount = async(req, res) =>{
    try {
        // Extract data from request body
        const { account_username, account_password, account_email, account_contactNo, isAccountVerified } = req.body;

        // Check if the username already exists
        const existingUser = await Accounts.findOne({ where: { account_username: account_username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail = await Accounts.findOne({ where: { account_email: account_email }})
        if (existingEmail) {
            return res.status(400).json({ message: 'E-mail already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(account_password, saltRounds);

        // Create user in VersatilyDB "accounts table"
        const user = await Accounts.create({ account_username: account_username, account_pass: hashedPassword, account_email: account_email, account_contactNo: account_contactNo, isAccountVerified: isAccountVerified, createdBy: 'System' });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}