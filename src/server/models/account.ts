import * as Mongoose from 'mongoose'

const accountSchema = new Mongoose.Schema({
  id: String,
  email: String,
  username: String,
  hashedPassword: String
})

export default Mongoose.model('account', accountSchema)
