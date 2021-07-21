import { Schema, model, connect } from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  customerDetails: object
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  customerDetails: Object,
})

const userModel = model<User>('User', schema)
export default userModel
