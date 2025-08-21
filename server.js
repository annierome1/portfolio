const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// SMTP Transporter
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,
    pass: process.env.REACT_APP_EMAIL_PASS,
  },
});

// Email API endpoint
app.post('/api/email', async (req, res) => {
  try {
    const { to, subject, formType, data } = req.body;
    const { name, email, message, ...others } = data;

    // Build email content based on form type
    const lines = [`Hi! My name is ${name}.`, ''];

    if (formType === 'contact') {
      lines.push("I have a question regarding:", '');
    } else if (formType === 'inquiry') {
      lines.push("I'd like to submit an inquiry about:", '');
    } else {
      lines.push('I have a question regarding:', '');
    }

    // Add subject if provided
    if (subject) {
      lines.push(`Subject: ${subject}`);
    }

    // Add any extra fields
    Object.entries(others).forEach(([key, val]) => {
      if (val) lines.push(`${key}: ${val}`);
    });

    // Add the main message
    if (message) {
      lines.push('', message);
    }

    lines.push('', 'Thanks!', name);

    // Build HTML and plain-text bodies
    const html = lines.map((l) => `<p>${l}</p>`).join('');
    const text = lines.join('\n');

    // Send via Gmail SMTP
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.REACT_APP_EMAIL_USER}>`,
      to: to || process.env.REACT_APP_EMAIL_USER,
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      text,
      html,
      replyTo: email
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Mail send error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Email server running on port ${PORT}`);
  console.log(`📧 SMTP configured for: ${process.env.REACT_APP_EMAIL_USER}`);
});
