'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

function startServer(port, routes) {
  if (!port) throw Error(`Port is required to start server`);
  if (!routes) throw Error(`Routes is required to start server`);

  const app = (0, _express2.default)();
  app.use(_express2.default.json());
  app.use('/', routes);

  app.listen(port, () => {
    console.log(`Server running at port ${port} in ${process.env.NODE_ENV} mode`);
  });
}

exports.default = startServer;