'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

const schema = new _mongoose.Schema({
  title: {
    type: String,
    require: true
  },

  description: {
    type: String,
    require: true
  },
  slug: {
    type: String
  },
  price: {
    type: Number,
    require: true
  },
  image: {
    type: String,
    trim: true
  }
});

exports.default = (0, _mongoose.model)('productModel', schema);