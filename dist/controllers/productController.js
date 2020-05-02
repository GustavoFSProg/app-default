'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _azureStorage = require('azure-storage');

var _azureStorage2 = _interopRequireDefault(_azureStorage);

var _guid = require('guid');

var _guid2 = _interopRequireDefault(_guid);

var _productModel = require('../models/productModel');

var _productModel2 = _interopRequireDefault(_productModel);

var _onSuccess = require('../utils/onSuccess');

var _onSuccess2 = _interopRequireDefault(_onSuccess);

var _onError = require('../utils/onError');

var _onError2 = _interopRequireDefault(_onError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function get(req, res) {
  try {
    const data = await _productModel2.default.find({}, 'title image');
    return (0, _onSuccess2.default)(res, 200, data);
  } catch (error) {
    return (0, _onError2.default)(res, error);
  }
}

async function getById(req, res) {
  try {
    const data = await _productModel2.default.findById(req.params.id, 'slug title price');
    return (0, _onSuccess2.default)(res, 200, data);
  } catch (error) {
    return (0, _onError2.default)(res, error);
  }
}

async function update(req, res) {
  try {
    await _productModel2.default.findByIdAndUpdate(req.params.id, req.body, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        slug: req.body.slug
      }
    });
    return (0, _onSuccess2.default)(res, 200, 'Produto editado com sucesso!');
  } catch (error) {
    return (0, _onError2.default)(res, 401, 'ERRO produto não editado!');
  }
}

async function deleteById(req, res) {
  try {
    await _productModel2.default.findByIdAndRemove(req.params.id);

    return (0, _onSuccess2.default)(res, 200, 'Produto excluido com sucesso!');
  } catch (error) {
    return (0, _onError2.default)(res, 400, 'ERRO produto não excluido!');
  }
}

async function create(req, res) {
  try {
    // Cria o Blob Service
    const blobSvc = _azureStorage2.default.createBlobService('DefaultEndpointsProtocol=https;AccountName=meuapp;AccountKey=LfxCD4uhiaT3DqwzftUNwka7+Q1vPiTQZtIlQXSmkkzkU7m6gw65Ey/SfSC/y+iahTC6mqED/AWaicO8QWBq3g==;EndpointSuffix=core.windows.net');

    let filename = `${_guid2.default.raw().toString()}.jpg`;
    const rawdata = req.body.image;
    const matches = rawdata.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const type = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    // Salva a imagem
    await blobSvc.createBlockBlobFromText('product-images', filename, buffer, { contentType: type }, function (error) {
      if (error) filename = 'default-product.png';
    });

    await _productModel2.default.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
      image: `https://meuapp.blob.core.windows.net/product-images/${filename}`
    });
    return (0, _onSuccess2.default)(res, 201, 'Produto cadastrado com sucesso!');
  } catch (error) {
    return (0, _onError2.default)(res, error);
  }
}

exports.default = { get, create, getById, update, deleteById };