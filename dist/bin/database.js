'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function startDatabase(code) {
  if (!code) {
    throw Error('Connection String is required');
  }
  _mongoose2.default.connect(code, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  return _mongoose2.default;
}

exports.default = startDatabase;