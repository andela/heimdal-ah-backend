import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailer = {
  sendCustomMail(emailAddress, emailContent) {
    const { emailSubject, emailBody } = emailContent;

    const msg = {
      to: emailAddress,
      from: 'Heimdal <hello@heimdal.com>',
      subject: emailSubject,
      html: emailBody
    };

    sgMail.send(msg);
  }
};

export default mailer;
