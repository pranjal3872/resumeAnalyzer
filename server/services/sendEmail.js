const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      sender: { name: "Resume Analyzer", email: process.env.EMAIL_USER },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email Sent:", response.body?.messageId || response);
    return response;
  } catch (err) {
    console.error("Brevo Email Error:", err.response?.body || err.message);
    throw err;
  }
};

module.exports = sendEmail;