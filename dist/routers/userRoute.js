'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();

const prefix = '/users';

const userRoutesList = [routes.post('/signup', _userController2.default.signup), routes.post('/signin', _userController2.default.signin), routes.get(prefix, _userController2.default.get)];

exports.default = userRoutesList;