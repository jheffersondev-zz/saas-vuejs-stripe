import { Schema, model, connect } from 'mongoose'

interface User {
  name: string
  email: string
  password: string
  customerDetails: any
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  customerDetails: { type: Object, required: true },
  address: Object,
})

const userModel = model<User>('User', schema)
export default userModel
