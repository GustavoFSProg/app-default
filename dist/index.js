'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _server = require('./bin/server');

var _server2 = _interopRequireDefault(_server);

var _database = require('./bin/database');

var _database2 = _interopRequireDefault(_database);

var _routers = require('./routers');

var _routers2 = _interopRequireDefault(_routers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const port = 4000;

(0, _server2.default)(port, _routers2.default);

(0, _database2.default)(process.env.CONNECTION_STRING);

exports.default = { startServer: _server2.default, startDatabase: _database2.default };