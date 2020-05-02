'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

const schema = new _mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  surname: {
    type: String,
    require: true
  },
  fone: {
    type: String
  },

  email: {
    type: String,
    require: true
  },
  password: {
    type: String
  }
});

exports.default = (0, _mongoose.model)('userModel', schema);