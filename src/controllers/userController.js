import md5 from 'md5'
import dotenv from 'dotenv'
import userModel from '../models/userModel'
import { generateToken } from '../services/authenticate'
import send from '../services/emailService'
import onSuccess from '../utils/onSuccess'
import onError from '../utils/onError'

dotenv.config()

async function signin(req, res) {
  try {
    const data = await userModel.findOne({
      email: req.body.email,
      password: md5(req.body.password + process.env.SALT_KEY),
    })

    if (!data) return onError(res, 400, 'Email ou senha inválidos!')

    const token = await generateToken({
      email: data.email,
      password: data.password,
    })

    if (!token) return onError(res, 300, 'Deu errado, token não gerado!')

    return onSuccess(res, 200, {
      token,
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
      },
    })
  } catch (error) {
    return onError(res, 500, error)
  }
}

async function get(req, res) {
  try {
    const data = await userModel.find({}, 'name surname email')
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'ERRO no GET' })
  }
}

async function signup(req, res) {
  try {
    await userModel.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      fone: req.body.fone,
      password: md5(req.body.password + process.env.SALT_KEY),
    })
    await send(req, res)

    return onSuccess(res, 201, 'Usuario cadastrado com sucesso!')
  } catch (error) {
    return onError(res, 401, 'ERRO, Usuario não cadastrado!')
  }
}

export default { signup, signin, get }
