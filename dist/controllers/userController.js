'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _md = require('md5');

var _md2 = _interopRequireDefault(_md);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _authenticate = require('../services/authenticate');

var _emailService = require('../services/emailService');

var _emailService2 = _interopRequireDefault(_emailService);

var _onSuccess = require('../utils/onSuccess');

var _onSuccess2 = _interopRequireDefault(_onSuccess);

var _onError = require('../utils/onError');

var _onError2 = _interopRequireDefault(_onError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

async function signin(req, res) {
  try {
    const data = await _userModel2.default.findOne({
      email: req.body.email,
      password: (0, _md2.default)(req.body.password + process.env.SALT_KEY)
    });

    if (!data) return (0, _onError2.default)(res, 400, 'Email ou senha inválidos!');

    const token = await (0, _authenticate.generateToken)({
      email: data.email,
      password: data.password
    });

    if (!token) return (0, _onError2.default)(res, 300, 'Deu errado, token não gerado!');

    return (0, _onSuccess2.default)(res, 200, {
      token,
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email
      }
    });
  } catch (error) {
    return (0, _onError2.default)(res, 500, error);
  }
}

async function get(req, res) {
  try {
    const data = await _userModel2.default.find({}, 'name surname email');
    return res.status(200).send(data);
  } catch (error) {
    return res.status(400).send({ message: 'ERRO no GET' });
  }
}

async function signup(req, res) {
  try {
    await _userModel2.default.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      fone: req.body.fone,
      password: (0, _md2.default)(req.body.password + process.env.SALT_KEY)
    });
    await (0, _emailService2.default)(req, res);

    return (0, _onSuccess2.default)(res, 201, 'Usuario cadastrado com sucesso!');
  } catch (error) {
    return (0, _onError2.default)(res, 401, 'ERRO, Usuario não cadastrado!');
  }
}

exports.default = { signup, signin, get };