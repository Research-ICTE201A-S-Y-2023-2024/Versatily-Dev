import bcrypt from "bcrypt"
import Accounts from "../../RBACModule/models/accountsModel.js"

export const registerAccount = async(req, res) =>{
      try {
        // Extract data from request body
        const { account_firstName, account_lastName, account_username, account_pass } = req.body;

        // Check if the username already exists
        const existingUser = await Accounts.findOne({ where: { account_username } });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(account_pass, saltRounds);

        // Create user in database
        const user = await Accounts.create({ account_firstName, account_lastName, account_pass: hashedPassword, account_username });
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}