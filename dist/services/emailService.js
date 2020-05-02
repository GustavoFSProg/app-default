'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mail = require('@sendgrid/mail');

var _mail2 = _interopRequireDefault(_mail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function send(req) {
  await _mail2.default.setApiKey(process.env.sendgridApiKey);
  const msg = {
    to: req.body.email,
    from: 'gustavosohne38@gmail.com',
    subject: 'Cadastro efetuado com Sucesso!',
    text: 'Cadastro Node.js',
    html: `${'<strong>Olá '}${req.body.name} ` + ` obrigado por se cadastrar no nosso site!</strong>`
  };
  _mail2.default.send(msg);
  return _mail2.default;
}

exports.default = send;