function onSuccess(res, code = 200, message = null) {
  if (message) {
    if (typeof message === 'string') {
      return res.status(code).send({ message })
    }

    if (typeof message === 'object') {
      return res.status(code).send(message)
    }
  }
  return res.status(code)
}

export default onSuccess
