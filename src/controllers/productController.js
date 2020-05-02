import azure from 'azure-storage'
import guid from 'guid'
import productModel from '../models/productModel'
import onSuccess from '../utils/onSuccess'
import onError from '../utils/onError'

async function get(req, res) {
  try {
    const data = await productModel.find({}, 'title image')
    return onSuccess(res, 200, data)
  } catch (error) {
    return onError(res, error)
  }
}

async function getById(req, res) {
  try {
    const data = await productModel.findById(req.params.id, 'slug title price')
    return onSuccess(res, 200, data)
  } catch (error) {
    return onError(res, error)
  }
}

async function update(req, res) {
  try {
    await productModel.findByIdAndUpdate(req.params.id, req.body, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        slug: req.body.slug,
      },
    })
    return onSuccess(res, 200, 'Produto editado com sucesso!')
  } catch (error) {
    return onError(res, 401, 'ERRO produto não editado!')
  }
}

async function deleteById(req, res) {
  try {
    await productModel.findByIdAndRemove(req.params.id)

    return onSuccess(res, 200, 'Produto excluido com sucesso!')
  } catch (error) {
    return onError(res, 400, 'ERRO produto não excluido!')
  }
}

async function create(req, res) {
  try {
    // Cria o Blob Service
    const blobSvc = azure.createBlobService(
      'DefaultEndpointsProtocol=https;AccountName=meuapp;AccountKey=LfxCD4uhiaT3DqwzftUNwka7+Q1vPiTQZtIlQXSmkkzkU7m6gw65Ey/SfSC/y+iahTC6mqED/AWaicO8QWBq3g==;EndpointSuffix=core.windows.net'
    )

    let filename = `${guid.raw().toString()}.jpg`
    const rawdata = req.body.image
    const matches = rawdata.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    const type = matches[1]
    const buffer = Buffer.from(matches[2], 'base64')

    // Salva a imagem
    await blobSvc.createBlockBlobFromText(
      'product-images',
      filename,
      buffer,
      { contentType: type },
      function (error) {
        if (error) filename = 'default-product.png'
      }
    )

    await productModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      slug: req.body.slug,
      image: `https://meuapp.blob.core.windows.net/product-images/${filename}`,
    })
    return onSuccess(res, 201, 'Produto cadastrado com sucesso!')
  } catch (error) {
    return onError(res, error)
  }
}

export default { get, create, getById, update, deleteById }
