const nodemailer = require('nodemailer');

const sendVerificationEmail = async (toEmail, verificationLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,       // Mailtrap SMTP host
    port: process.env.EMAIL_PORT,       // Usually 2525
    auth: {
      user: process.env.EMAIL_USER,     // Mailtrap username
      pass: process.env.EMAIL_PASS      // Mailtrap password
    }
  });

  const mailOptions = {
    from: '"Fashion Measurement App" <no-reply@fashionapp.com>',
    to: toEmail,
    subject: 'Verify your email address',
    html: `
      <h3>Welcome!</h3>
      <p>Please click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
