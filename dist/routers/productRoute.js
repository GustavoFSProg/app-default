'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _productController = require('../controllers/productController');

var _productController2 = _interopRequireDefault(_productController);

var _authenticate = require('../services/authenticate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

const prefix = '/products';

const productRouteList = [
// routes.get(prefix, productController.get),
routes.post(prefix, _authenticate.authorize, _productController2.default.create), routes.get(prefix, _productController2.default.get), routes.get(`${prefix}/:id`, _productController2.default.getById), routes.put(`${prefix}/:id`, _authenticate.authorize, _productController2.default.update), routes.delete(`${prefix}/:id`, _authenticate.authorize, _productController2.default.deleteById)];

exports.default = productRouteList;