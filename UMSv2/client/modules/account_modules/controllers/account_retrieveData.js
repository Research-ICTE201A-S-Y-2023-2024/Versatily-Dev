import Accounts from '../models/accountsModel.js'

export const retrieveAccounts = async (req, res) => {
    try {
        const accounts = await Accounts.findAll({ attributes: ['account_id', 'account_username'] })
        res.json(accounts)
    } catch (error) {
        console.error('Error retrieving accounts: ', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}