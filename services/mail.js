import nodemailer from "nodemailer";
import { ErrorHandler } from "../utils/errors.js";
import { google } from "googleapis";

export default class MailService {
  transporter = async () => {
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject(new ErrorHandler(err.message, 500));
        }
        resolve(token);
      });
    });

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  };

  sendCodeToMail = async (mail, code) => {
    try {
      const go = await this.transporter();

      return go.sendMail({
        from: `Node-Blog-App ${process.env.EMAIL}`, // sender address
        to: mail, // list of receivers
        subject: "Here is the your verification code.", // Subject line
        html: `<h3> Hi there. Please enter the code in the relevant field.<h3/>
        <div>${code}</div>`,
      });
    } catch (error) {
      throw new ErrorHandler(error.message, 500);
    }
  };
}
