const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Resume Analyzer <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message || "Failed to send email");
    }

    console.log("✅ Email Sent:", data.id);
    return data;
  } catch (err) {
    console.error("Email sending failed:", err);
    throw err;
  }
};

module.exports = sendEmail;