require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendMail = (email, otp) => {
  return transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset OTP",
    text: `Your OTP to reset your password is: ${otp}`,
  });
};
