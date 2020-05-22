const nodemailer = require('nodemailer');
const config = require('./config');

let sendEmail = async(toEmail, message) => {
    let transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
            user: config.email.auth.user,
            pass: config.email.auth.password
        }
    });
    
    let info = await transporter.sendMail({
        from: `${config.email.auth.user}`, // sender address
        to: toEmail, // list of receivers
        subject: "Recuperação de senha", // Subject line
        text: message, // plain text body
        html: message // html body
      });
}

module.exports = {
    sendEmail
}
