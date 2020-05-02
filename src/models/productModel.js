import { model, Schema } from 'mongoose'

const schema = new Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    trim: true,
  },
})

export default model('productModel', schema)
