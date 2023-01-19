import nodemailer from 'nodemailer';
import {google} from 'googleapis';
import {activateEmailTemplate} from '../emails/activateEmailTemplate';

const {OAuth2} = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_MAIL_SECRET,
  GOOGLE_MAIL_ID,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(GOOGLE_MAIL_ID, GOOGLE_MAIL_SECRET, OAUTH_PLAYGROUND);

// send email

type Helper = {
  to: string;
  url: string;
};

type mailTypes = {
  to: string;
  url: string;
  subject: string;
  txt: string;
  template: ({to, url}: Helper) => string;
};

export const sendEmail = ({to, url, txt, subject, template}: mailTypes) => {
  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken().toString();
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: GOOGLE_MAIL_ID,
      clientSecret: GOOGLE_MAIL_SECRET,
      refreshToken: GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to,
    subject,
    html: template({to, url}),
  };
  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return err;
    return info;
  });
};
