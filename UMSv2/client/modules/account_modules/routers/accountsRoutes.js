import express from 'express'
import { loginAccount } from '../controllers/account_authLogin.js'
import { registerAccount } from '../controllers/account_authRegister.js'
import { retrieveAccounts } from '../controllers/account_retrieveData.js'

const accounts_router = express()

accounts_router.post('/login', loginAccount)
accounts_router.post('/register', registerAccount)
accounts_router.get('/api/accounts', retrieveAccounts)

export default accounts_router;