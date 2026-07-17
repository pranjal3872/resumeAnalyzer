const axios = require("axios");

const sendEmail = async (to, subject, html) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { name: "Resume Analyzer", email: process.env.EMAIL_USER },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("✅ Email Sent:", response.data.messageId);
    return response.data;
  } catch (err) {
    console.error("Brevo Email Error:", err.response?.data || err.message);
    throw err;
  }
};

module.exports = sendEmail;