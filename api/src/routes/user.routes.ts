import express, { Request, Response } from 'express'
import userController from '../controllers/user.controllers'
import bodyContentValidator from '../middlewares/BodyContentValidator'

const UserController = new userController()
const app = express.Router()
app.use(bodyContentValidator)

app.post('/signup', UserController.SignUp)
app.post('/login', UserController.Login)

export default app
