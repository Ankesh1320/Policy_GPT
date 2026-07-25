import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html, replyTo }) => {
  // Safe fallback if SMTP environment variables are not configured yet
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log("----------------------- SMTP LOG -----------------------");
    console.log("WARNING: SMTP_USER or SMTP_PASS env variables are missing.");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    if (replyTo) {
      console.log(`Reply-To: ${replyTo}`);
    }
    if (process.env.NODE_ENV === "development") {
      console.log(`HTML Content:\n${html}`);
    } else {
      console.log("HTML Content: [Redacted in production]");
    }
    console.log("---------------------------------------------------------");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"PolicyGPT Support" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    ...(replyTo && { replyTo }),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP] Email sent successfully. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("[SMTP ERROR] Failed to send email via SMTP:", error);
    throw error;
  }
};

export default sendEmail;
