const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('nodemailer/lib/mailer');

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM, // lpeterbangura@gmail.com
      pass: process.env.EMAIL_PASSWORD // uaaz eysk gayy xmfu
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL_TO, // lpeterbangura@gmail.com
    subject: `Contact Form - ${subject}`,
    text: `From: ${name} <${email}>

Message:
${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

module.exports = router;
