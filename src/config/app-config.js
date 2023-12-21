require("dotenv").config();

const appConfig = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: "7d",
  emailHost: process.env.EMAIL_HOST,
  emailSender: process.env.EMAIL_SENDER_EMAIL,
  emailPassword: process.env.EMAIL_SENDER_PASSWORD
};

module.exports = appConfig;
