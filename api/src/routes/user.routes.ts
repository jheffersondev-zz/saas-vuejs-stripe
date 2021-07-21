import express, { Request, Response } from 'express'
import userController from '../controllers/user.controllers'
import bodyContentValidator from '../middlewares/BodyContentValidator'

const UserController = new userController()
const app = express.Router()

app.post('/signup', bodyContentValidator, UserController.SignUp)

export default app
