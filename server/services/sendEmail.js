const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true only for port 465
  auth: {
    user: process.env.EMAIL_USER.trim(),
    pass: process.env.EMAIL_PASS.replace(/\s/g, ""),
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    console.log("Verifying SMTP connection...");

    await transporter.verify();
    console.log("✅ SMTP Connected");

    await transporter.sendMail({
      from: `"Resume Analyzer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email Sent");
  } catch (err) {
    console.error("SMTP Error:");
    console.error(err);
    throw err;
  }
};

module.exports = sendEmail;