'use strict'

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
var helper = sg.mail

class Email {
  constructor() {
    this.to = 'zak@super-fantastic.com'
    this.from = 'visitor@zak-fisher.com'
  }

  send(data) {
    var from = new helper.Email(data.from)
    var to = new helper.Email(data.to)
    var content = new helper.Content('text/html', data.content)
    var mail = new helper.Mail(from, data.subject, to, content)

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    return sg.API(request)
      .then(response => {
        data.res.send(response)
      })
      .catch(error => {})
  }

  sendVisitorEmail(req, res) {
    res.send(req.body)
    let name = req.body.name
    let email = req.body.email
    let message = req.body.message
    this.send({
      from: this.from,
      to: this.to,
      subject: 'Visitor Email',
      content: `
        <h3>Name</h3>
        <p>${name}</p>
        <h3>Email</h3>
        <p>${email}</p>
        <h3>Message</h3>
        <p>${message}</p>
      `,
      res: res
    })
  }
}

module.exports = new Email
