// utils/sendEmail.js
require("dotenv").config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Send email using Resend
 * @param {string} to - Receiver email address
 * @param {string} subject - Email subject
 * @param {string} html - HTML content of the email
 */
const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "Ladder Platform <jicey11513@lesotica.com>",
      to,
      subject,
      html,
    });
    s;
    return data;
  } catch (error) {
    console.error("❌ Error sending email via Resend:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = sendEmail;
