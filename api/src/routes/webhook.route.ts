import express from 'express'
import WebhookController from '../controllers/webhook.controller'

const webhook = new WebhookController()

const app = express.Router()
app.post('/webhook', express.raw({ type: '*/*' }), webhook.Main)

export default app
