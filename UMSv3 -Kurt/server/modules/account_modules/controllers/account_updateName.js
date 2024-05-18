import Accounts from '../models/accountsModel.js';

export const updateAccountName = async (req, res) => {
    const { email, account_firstName, account_lastName } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const account = await Accounts.findOne({ where: { account_email: email } });
        
        if (!account) {
            return res.status(404).json({ error: 'User not found' });
        }

        account.account_firstName = account_firstName;
        account.account_lastName = account_lastName;
        await account.save();

        res.status(200).json({ message: 'User details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Failed to update user details' });
    }
};
