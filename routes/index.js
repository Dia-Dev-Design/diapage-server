var express = require('express');
var router = express.Router();

const transporter = require('../configs/nodemailer')

router.post('/send-email', async (req, res) => {

  try {
    // const { recipientEmail, subject } = req.body;

    subject = "Testing Route!!!"

    const html = `<div>
                    <h1>We've received an information request!</h1>
                    <p>Thank you for contacting Día Dev & Design! We're excited to have you on board!</p>
                    <p>This is a Test</p>
                    <p>The Día Team</p>
                  </div>`
  
    const mailOptions = {
      from: "info@diadevdesign.com",
      to: "info@diadevdesign.com",
      subject,
      html,
    };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  });
  
module.exports = router;
