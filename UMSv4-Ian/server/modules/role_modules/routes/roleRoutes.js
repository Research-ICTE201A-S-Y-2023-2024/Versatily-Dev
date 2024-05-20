import express from 'express'
import { createUserRole } from '../controllers/userRoles_createRole'

const roleRouter = express()

roleRouter.post('/create-role', createUserRole)

export default roleRouter