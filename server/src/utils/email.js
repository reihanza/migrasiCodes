const nodemailer = require("nodemailer");
const internalIp = require("internal-ip");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const sendMailVerivy = async (mail, token, password, type) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.ADMIN_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  const url = `http://127.0.0.1:${process.env.DATABASE_PORT}/${type}/confirmation/${token}`;
  const mailOptions = {
    from: "CODES", // sender address
    to: mail, // list of receivers
    subject: "Confirm Email Account", // Subject line
    html: `Your password is : ${password} \nPlease click this email to confirm your email: <a href="${url}">${url}</a>\nTest: <a href="http://${await internalIp.v4()}:3000/services">Test</a>`,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("error");
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = {
  sendMailVerivy,
};
