const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT * 1,
    secure: false,// true for 465, false for other ports
    auth: {
        user: process.env.SMTP_AUTH_USER, // your GoDaddy email
        pass: process.env.SMTP_AUTH_PASS // your GoDaddy email password
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
});

module.exports = transporter