import express from 'express'
import { createUserRole } from '../controllers/userRoles_createRole.js'

const roleRouter = express()

roleRouter.post('/create-role', createUserRole)

export default roleRouter