const nodemailer = require("nodemailer");
const senderEmail = process.env.EMAIL_USER;
const senderPass = process.env.EMAIL_PASS;

// קביעת transporter לשימוש ב-nodemailer
const transporter = nodemailer.createTransport({
  host: "engager.co.il", // החלף את זה עם כתובת השרת שלך
  port: 465, // או 465 תלוי בקונפיגורציה של השרת שלך (587 הוא עבור TLS, 465 הוא עבור SSL)
  secure: true, // true עבור 465, false עבור 587
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
