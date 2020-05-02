import { Router } from 'express'
import productController from '../controllers/productController'
import { authorize } from '../services/authenticate'

const routes = new Router()

const prefix = '/products'

const productRouteList = [
  // routes.get(prefix, productController.get),
  routes.post(prefix, authorize, productController.create),
  routes.get(prefix, productController.get),
  routes.get(`${prefix}/:id`, productController.getById),
  routes.put(`${prefix}/:id`, authorize, productController.update),
  routes.delete(`${prefix}/:id`, authorize, productController.deleteById),
]

export default productRouteList
