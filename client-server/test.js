const express = require('express');
const { createTransporter, mailConfig } = require('./emailConfig');
const app = express();

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"${mailConfig.from.name}" <${mailConfig.from.address}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent', info });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
