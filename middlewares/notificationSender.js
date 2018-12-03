import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const notificationSender = {
  sendVerificationMail(data) {
    const { email, name, verificationLink } = data;

    const msg = {
      to: email,
      from: 'Heimdal <hello@heimdal.com>',
      subject: 'Verify your email on Authors Haven',
      html: `
        <div>
          <h2>Hello ${name},</h2>
          Please click here to verify your email address 
          <a href="${verificationLink}">${verificationLink}</a>
        </div>
      `
    };

    sgMail
      .send(msg)
      .then(() => console.log('inside notification sender'))
      .catch(error => `Email was not sent, Reasons: ${error}`);
  }
};

export default notificationSender;
