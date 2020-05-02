import { model, Schema } from 'mongoose'

const schema = new Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  fone: {
    type: String,
  },

  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
  },
})

export default model('userModel', schema)
