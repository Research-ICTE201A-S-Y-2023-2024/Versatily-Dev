import Accounts from '../models/accountsModel.js';
import jwt from "jsonwebtoken";

const secretKey = '1234'

export const updateAccountName = async (req, res) => {
    const { token, account_firstName, account_lastName } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {

        const decodedToken  = jwt.verify(token, secretKey);

        const email = decodedToken["email"]

        console.log("First Name:", account_firstName)
        console.log("Last Name:", account_lastName)
        console.log("Email:", email)

        const account = await Accounts.findOne({ where: { account_email: email } });
        
        if (!account) {
            return res.status(404).json({ error: 'User not found' });
        }

        await account.update({  account_firstName: account_firstName, account_lastName: account_lastName })

        account.save()

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Failed to update user details' });
    }
};
