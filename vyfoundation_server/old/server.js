// server.js (Node.js backend)
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Configure the email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email provider
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Subscription Confirmation',
    text: 'Thank you for subscribing to our newsletter!',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Subscription successful');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
