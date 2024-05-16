import express from 'express'
import { loginAccount } from '../controllers/account_authLogin.js'
import { registerAccount } from '../controllers/account_authRegister.js'
import { retrieveAccounts } from '../controllers/account_retrieveData.js'
import { blurEmail } from '../controllers/account_blurEmail.js'
import { sendVerificationEmail } from '../controllers/account_verifyEmail.js'
import { verifyAccount } from '../controllers/account_verifyEmail.js'

const accounts_router = express()

accounts_router.post('/login', loginAccount)
accounts_router.post('/register', registerAccount)
accounts_router.get('/api/accounts', retrieveAccounts)
accounts_router.post('/blur-email', blurEmail)
accounts_router.post('/send-email-verification', sendVerificationEmail)
accounts_router.get('/verify-account', verifyAccount)

export default accounts_router;