import dotenv from 'dotenv'
import startServer from './bin/server'
import startDatabase from './bin/database'
import routesList from './routers'

dotenv.config()

const port = 4000

startServer(port, routesList)

startDatabase(process.env.CONNECTION_STRING)

export default { startServer, startDatabase }
