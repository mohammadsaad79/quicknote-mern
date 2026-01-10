const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await resend.emails.send({
      from: "QuickNote <onboarding@resend.dev>",
      to: [to],
      subject,
      html,
    });
  } catch (err) {
    console.error("Resend error:", err);
    throw err;
  }
};

module.exports = sendEmail;
