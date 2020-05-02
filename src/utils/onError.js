function onError(
  response,
  errorParam,
  status = 500,
  message = 'Falha ao processar sua requisição'
) {
  const error = { log: errorParam.errmsg, message }
  return response.status(status).send({ error })
}

export default onError
