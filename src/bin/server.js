import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

function startServer(port, routes) {
  if (!port) throw Error(`Port is required to start server`)
  if (!routes) throw Error(`Routes is required to start server`)

  const app = express()
  app.use(express.json())
  app.use('/', routes)

  app.listen(port, () => {
    console.log(
      `Server running at port ${port} in ${process.env.NODE_ENV} mode`
    )
  })
}

export default startServer
