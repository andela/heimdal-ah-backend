import jwt from 'jsonwebtoken';

import notificationSender from '../middlewares/notificationSender';
import Helper from '../helpers/helper';
import models from '../models';

const { User } = models;

/**
 * @description - This class handles the users
 * */
class UsersController {
  /**
   * @description - Method to signup a new user
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object containing the created user's token
   */
  static signUp(req, res) {
    const email = req.body.email || 'henry.izontimi@gmail.com';
    const name = req.body.username || 'Henry';
    const password = req.body.password || '12345';
    const link = `http://${req.headers.host}/api/users/verify-email`;

    // console.log('REQ', req.body);

    // generate an email token which can be used to verify the user.
    const emailToken = Helper.generateEmailToken(email);

    const verificationLink = `${link}/${emailToken}`;
    const body = { email, name, verificationLink };

    // should restructure the email in such a way that it contains
    // userEmail, userName, emailSubject, emailBody;
    // console.log(verificationLink);

    notificationSender.sendVerificationMail(body);

    return User.create({
      username: name,
      email,
      password,
      emailVerification: false
    })
      .then(user => res.status(201).send({
        success: true,
        user,
        emailToken
      }))
      .catch(error => res.status(400).send(error));
  }

  /**
   * @description  Method to verify a users email
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static verifyEmail(req, res) {
    const { emailToken } = req.params;
    const decodedToken = jwt.decode(emailToken);
    if (!decodedToken) {
      return res.status(400).send({
        success: false,
        msg: 'The verification link is invalid. Check your email and try again'
      });
    }
    const { email } = decodedToken;

    return User.findOne({
      where: { email }
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            success: false,
            msg: 'No user found'
          });
        }
        return User.update(
          {
            emailVerification: true
          },
          { where: { email } }
        ).then(() => res.status(200).send({
          success: true,
          msg: 'Your email has been verified'
        }));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default UsersController;
