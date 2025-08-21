import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.REACT_APP_EMAIL_USER,        // your Gmail address
    pass: process.env.EMAIL_PASS,        // your Gmail app password
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

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
      // default → general inquiry
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
      to: to || process.env.REACT_APP_EMAIL_USER, // send to specified email or default to yourself
      subject: `Portfolio Contact: ${subject || 'New Message'}`,
      text,
      html,
      replyTo: email // so you can reply directly to the person
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('Mail send error:', err);
    return res.status(500).json({ error: 'Failed to send email.' });
  }
}
