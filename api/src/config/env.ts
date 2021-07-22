import dotenv from 'dotenv'
dotenv.config()

export default {
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  databaseUrl: process.env.DB_URL,
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
  },
}
