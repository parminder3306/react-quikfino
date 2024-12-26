import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.quikfino.com",
  port: 587,
  secure: true,
  auth: {
    user: "admin@quikfino.com",
    pass: "Janny@123",
  },
});

const mail = {
  send: async (options) => {
    try {
      const info = await transporter.sendMail(options);
      return info.messageId;
    } catch (error) {
      console.error("Error sending mail: ", error);
      return null;
    }
  },

  sendOTP: async (to, otp) => {
    const options = {
      from: "admin@quikfino.com",
      to,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
    };
    return await mail.send(options);
  },

  sendPasswordReset: async (to, resetToken) => {
    const resetLink = `https://yourapp.com/reset-password?token=${resetToken}`;
    const options = {
      from: "admin@quikfino.com",
      to, // recipient email
      subject: "Password Reset Request",
      text: `To reset your password, click the link: ${resetLink}`,
      html: `<p>To reset your password, click the link: <a href="${resetLink}">Reset Password</a></p>`,
    };
    return await mail.send(options);
  },

  sendWelcomeEmail: async (to, name) => {
    const options = {
      from: "admin@quikfino.com",
      to, // recipient email
      subject: "Welcome to QuikFino!",
      text: `Hello ${name}, welcome to QuikFino!`,
      html: `<p>Hello <strong>${name}</strong>, welcome to QuikFino!</p>`,
    };
    return await mail.send(options);
  },

  sendContactUsResponse: async (to, userName, message) => {
    const options = {
      from: "admin@quikfino.com",
      to, // recipient email
      subject: "Thank you for contacting QuikFino",
      text: `Hi ${userName},\n\nThank you for your message: ${message}\n\nWe will get back to you shortly.`,
      html: `<p>Hi <strong>${userName}</strong>,</p><p>Thank you for your message: ${message}</p><p>We will get back to you shortly.</p>`,
    };
    return await mail.send(options);
  },
};

export default mail;
