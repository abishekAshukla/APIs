const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const mailconfig = require("./mailconfig.js");
const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(mailconfig.clientId, mailconfig.clientSecret);
OAuth2_client.setCredentials({ refresh_token: mailconfig.refreshToken });

function send_mail(recipient, otpCode) {
  const accessToken = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: mailconfig.user,
      clientId: mailconfig.clientId,
      clientSecret: mailconfig.clientSecret,
      refreshToken: mailconfig.refreshToken,
      accessToken: accessToken,
    },
  });

  const mail_options = {
    from: `Abhishek Shukla`,
    to: recipient,
    subject: `Verify Email - [${otpCode}]`,
    html: get_html_message(otpCode),
  };

  transport.sendMail(mail_options, function (error, result) {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("Success: ", result);
    }
    transport.close();
  });
}

function get_html_message(otp) {
  return `
  <div style="text-align: center;">
      <img
        style="width: 150px; min-width: 120px; display: block; margin-left: auto; margin-right: auto;"
        src="https://blog203.vercel.app/static/media/logo.f744d5df74531c5c5655.png"
        alt="logos"
      />
     <h1 style="margin-top: 50px; color: black;">Welcome</h1>
     <h3 style="color: black;">Use the verification code below to subscribe my newsletter</h3>
     <h1 style="font-size: 50px; border: 2px solid black; color: black;">${otp}</h1>

     <div style="background: black; padding: 20px;">
        <img style="width: 120px; border-radius: 50%;" src="https://blog203.vercel.app/static/media/profilePic.e1c1d3538f79c1923926.jpg" alt="profile">
        <h2 style="color: white;">Abhishek Shukla | Frontend developer</h2>
        <a style="text-decoration: none; color: white; font-size: 20px;" href="https://blog203.vercel.app/blog/testing">abhishekshukla.com</a>
     </div>
    </div>
    `;
}

// domain/api/mail/verify/:blogId
const sendmailTo = asyncHandler(async (req, res) => {
  const otpCode = req.header("otpcode");
  // const { otpCode } = req.body;
  try {
    send_mail(req.params.blogId, otpCode);
    res.json({ result: "success" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendmailTo };
