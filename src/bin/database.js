import mongoose from 'mongoose'

async function startDatabase(code) {
  if (!code) {
    throw Error('Connection String is required')
  }
  mongoose.connect(code, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  return mongoose
}

export default startDatabase
