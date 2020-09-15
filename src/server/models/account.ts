import * as Mongoose from 'mongoose'

export interface AccountData extends Mongoose.Document {
  id: string
  email: string
  username: string
  hashedPassword: string
}

const accountSchema = new Mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true }
})

export default Mongoose.model<AccountData>('account', accountSchema)
