const nodemailer = require("nodemailer");
const appConfig = require("../../config/app-config");

const sendEmail = async (
  to_email,
  subject,
  text
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: appConfig.emailHost,
      secure: false,
      auth: {
        user: appConfig.emailSender,
        pass: appConfig.emailPassword,
      },
    });

    return new Promise(async (resolve, reject) => {
      await transporter
        .sendMail({
          from: appConfig.emailSender,
          to: to_email,
          subject: subject,
          html: text,
        })
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          console.log("Email not sent : ", err);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Email not sent");
    console.log(error);
  }
};

module.exports = { sendEmail };
