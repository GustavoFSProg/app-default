'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function onSuccess(res, code = 200, message = null) {
  if (message) {
    if (typeof message === 'string') {
      return res.status(code).send({ message });
    }

    if (typeof message === 'object') {
      return res.status(code).send(message);
    }
  }
  return res.status(code);
}

exports.default = onSuccess;