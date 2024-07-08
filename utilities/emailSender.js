const nodemailer = require("nodemailer");
const senderEmail = process.env.EMAIL_USER;
const senderPass = process.env.EMAIL_PASS;

// קביעת transporter לשימוש ב-nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: senderPass,
  },
});

// פונקציה גנרית לשליחת מייל
async function sendEmail(to, subject, htmlContent) {
  const mailOptions = {
    from: senderEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}`, error);
  }
}
module.exports = { sendEmail };
