const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	//secure: true, // lack of ssl commented this. You can uncomment it.
	auth: {
		user: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_PASSWORD
	}
});

exports.send = function (from, to, subject, html) {
	// send mail with defined transport object
	// returns a promise
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: from, // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
      to: to, // list of receivers e.g. bar@example.com, baz@example.com
      subject: subject, // Subject line e.g. 'Hello ✔'
      //text: text, // plain text body e.g. Hello world?
      html: html // html body e.g. '<b>Hello world?</b>'
    }, (err, info) => {
      if (err) reject(err);
      else resolve(info);
    })
  })
};