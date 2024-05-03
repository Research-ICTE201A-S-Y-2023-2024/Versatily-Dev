import bcrypt from "bcrypt"
import Accounts from "../../RBACModule/models/accountsModel.js"

export const loginAccount = async(req, res) =>{
    try {
        // Extract data from request body
        const { account_username, account_pass } = req.body;
        
        // Find the user by username
        const user = await Accounts.findOne({ where: { account_username } });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(account_pass, user.account_pass);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // If everything is okay, send a success response
        res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}