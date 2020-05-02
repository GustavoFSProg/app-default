import sendgrid from '@sendgrid/mail'

async function send(req) {
  await sendgrid.setApiKey(process.env.sendgridApiKey)
  const msg = {
    to: req.body.email,
    from: 'gustavosohne38@gmail.com',
    subject: 'Cadastro efetuado com Sucesso!',
    text: 'Cadastro Node.js',
    html:
      `${'<strong>Olá '}${req.body.name} ` +
      ` obrigado por se cadastrar no nosso site!</strong>`,
  }
  sendgrid.send(msg)
  return sendgrid
}

export default send
