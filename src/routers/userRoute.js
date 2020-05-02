import { Router } from 'express'
import userController from '../controllers/userController'

const routes = new Router()

const prefix = '/users'

const userRoutesList = [
  routes.post('/signup', userController.signup),
  routes.post('/signin', userController.signin),
  routes.get(prefix, userController.get),
]

export default userRoutesList
