import express from 'express'
import UserController from '../controllers/user.controllers'
import bodyContentValidator from '../middlewares/BodyContentValidator'

const userController = new UserController()
const app = express.Router()

app.post('/signup', bodyContentValidator, userController.SignUp)
app.post('/login', bodyContentValidator, userController.Login)

export default app
