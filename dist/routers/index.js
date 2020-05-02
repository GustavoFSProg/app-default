'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _productRoute = require('./productRoute');

var _productRoute2 = _interopRequireDefault(_productRoute);

var _userRoute = require('./userRoute');

var _userRoute2 = _interopRequireDefault(_userRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routesList = [_productRoute2.default, _userRoute2.default];

exports.default = routesList;