'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = exports.decodeToken = exports.generateToken = undefined;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _onSuccess = require('../utils/onSuccess');

var _onSuccess2 = _interopRequireDefault(_onSuccess);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function generateToken(data) {
  return _jsonwebtoken2.default.sign(data, process.env.SALT_KEY, { expiresIn: '1d' });
}

async function decodeToken(token) {
  return _jsonwebtoken2.default.decode(token, process.env.SALT_KEY);
}

async function authorize(req, res, next) {
  const authToken = req.body.token || req.query.token || req.headers['x-access'];

  _jsonwebtoken2.default.verify(authToken, process.env.SALT_KEY, function (error) {
    if (error) {
      res.status(401).json({
        message: 'Token Inválido'
      });
    } else {
      next();
      return (0, _onSuccess2.default)(res, 202, 'Login validado!');
    }
  });
}

exports.generateToken = generateToken;
exports.decodeToken = decodeToken;
exports.authorize = authorize;