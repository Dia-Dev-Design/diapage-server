var express = require("express");
var router = express.Router();

const transporter = require("../configs/nodemailer");

router.post("/send-email", async (req, res) => {
  try {
    const { emailContent, subjectsSelected } = req.body;

    const subject = `We've received a message from ${emailContent.name}`;

    let interests = "";

    subjectsSelected.forEach((subject, i) => {
      if (subjectsSelected.length === 1) {
        interests += ` ${subject}`
      } else {
        if (i < subjectsSelected.length - 1) {
          interests += ` ${subject},`;
        } else {
          interests += ` and ${subject}`;
        }

      }
    });

    const html = `<div>
                    <h1>We've received an information request!</h1>
                    <p>${emailContent.name ? emailContent.name : "No name provided"} is interested in${interests ? interests : "nothing specific"}.</p>
                    ${
                      emailContent.message
                        ? `<p>They've left us the following messeage:</p>
                       <p>${emailContent.message}
                      `
                        : `<p>They did not provide a message</p>`
                    }
                    ${
                      emailContent.email
                        ? `<p>Their return email address is ${emailContent.email}</p>`
                        : `They did not provide an email address.`
                    }
                  </div>`;

    const mailOptions = {
      from: "info@diadevdesign.com",
      to: "info@diadevdesign.com",
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({
        message:
          "Message sent successfully! \nWe will be in touch with you soon",
      });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

module.exports = router;
