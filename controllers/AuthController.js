import mailer from '../helpers/mailer';
import Helper from '../helpers/helper';
import models from '../models';

const { User } = models;

/**
 * @description - This class handles the users
 * */
class AuthController {
  /**
   * @description - Method to signup a new user
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object containing the created user's token
   */
  static async signUp(req, res) {
    // This is where you should do your validation

    // This is just a mock data, replace with yours
    const email = req.body.email || 'henry.izontimi@gmail.com';
    const name = req.body.username || 'Henry';
    const password = req.body.password || '12345';

    // generate an email token which can be used to verify the user.
    const emailToken = Helper.generateEmailToken(email);

    // generate the email verification link
    const link = `http://${req.headers.host}/api/v1/users/verify-email`;
    const verificationLink = `${link}/${emailToken}`;

    // Construct the email content here {emailSubject and emailBody}
    const emailSubject = 'Verify your email on Authors Haven';

    const emailBody = `
      <div>
        <h2 style="color: blue">Hello ${name}, Thanks for signing up on heimdal</h2>
        Please click here to verify your email address, this link expires in two days.
        <a href="${verificationLink}">${verificationLink}</a>
      </div>
    `;

    const emailContent = { emailSubject, emailBody };

    // Send Verification mail as custom mail
    mailer.sendCustomMail(email, emailContent);

    try {
      // Create the user here, you can replace with yours
      const user = await User.create({
        email,
        password,
        username: name,
        emailVerification: false
      });

      return res.status(201).json({
        success: true,
        user,
        emailToken
      });
    } catch (error) {
      return res.status(500).json({
        message: 'An internal error occured, try again'
      });
    }
  }
}

export default AuthController;
