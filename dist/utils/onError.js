'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onError(response, errorParam, status = 500, message = 'Falha ao processar sua requisição') {
  const error = { log: errorParam.errmsg, message };
  return response.status(status).send({ error });
}

exports.default = onError;