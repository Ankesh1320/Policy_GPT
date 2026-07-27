import ContactMessage from "../models/ContactMessage.js";
import sendEmail from "../utils/sendEmail.js";

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const createContactMessage = async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    const errors = {};
    if (!fullName || !fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else if (!isEmail(email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!subject || !subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!message || !message.trim()) {
      errors.message = "Message is required";
    } else if (message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    const newMessage = new ContactMessage({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    await newMessage.save();

    // Send emails in a try-catch block to handle email service failures gracefully
    try {
      const supportEmail = process.env.SUPPORT_EMAIL || "help@policygpt.in";
      const supportSubject = `New Contact Form Query: ${subject.trim()}`;
      const supportHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background-color: #1e3a8a; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Contact Form Inquiry</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
            <p><strong>Full Name:</strong> ${fullName.trim()}</p>
            <p><strong>Email Address:</strong> ${email.trim().toLowerCase()}</p>
            <p><strong>Subject:</strong> ${subject.trim()}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-radius: 8px; border: 1px solid #eee; font-size: 15px; color: #444;">${message.trim()}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Submitted At: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;

      // 1. Send notification to support team
      await sendEmail({
        to: supportEmail,
        subject: supportSubject,
        html: supportHtml,
        replyTo: email.trim().toLowerCase(),
      });

      const userSubject = "We've received your message";
      const userHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
          <div style="background-color: #f97316; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">PolicyGPT Support</h1>
          </div>
          <div style="padding: 20px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
            <p>Hello <strong>${fullName.trim()}</strong>,</p>
            <p>Thank you for reaching out to PolicyGPT. We have received your message regarding: <strong>"${subject.trim()}"</strong>.</p>
            <p>Our support team will review your query and get back to you as soon as possible (usually within 2 working days).</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">This is an automated confirmation email. Please do not reply directly to this message.</p>
          </div>
        </div>
      `;

      // 2. Send automatic confirmation to user
      await sendEmail({
        to: email.trim().toLowerCase(),
        subject: userSubject,
        html: userHtml,
      });
    } catch (emailError) {
      // Gracefully log email failure but do not fail the database request
      console.error("[SMTP Notification Error] Failed to send contact emails:", emailError.message || emailError);
    }

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error creating contact message:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while saving contact message",
    });
  }
};
