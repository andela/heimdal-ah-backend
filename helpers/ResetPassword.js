import nodemailer from 'nodemailer';

/** @description usersController class
 * @return {object} the response object
 * @public
*/
class ResetPassword {
  /** @description it sends a mail to a user that forgot his password
 * @param {string} email is the request parameter
 * @param {string} token is the response parameter
 * @return {object} the response object
 * @public
*/
  static async passwordMail(email, token) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      subject: 25,
      auth: {
        user: 'hiemdal42@gmail.com',
        pass: 'andela2018'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const message = {
      from: 'hiemdal42@gmail.com',
      to: email,
      subject: 'Reset password',
      text: `reset your password http://localhost:8001/heimdal.com/resetpassword/${token}`
    };

    const data = await transporter.sendMail(message);
    if (!data) {
      return 'failure';
    }
    return 'success';
  }
}
export default ResetPassword;
