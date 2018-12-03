import jwtDecode from 'jwt-decode';
import emailvalidator from 'email-validator';

/** @description checks if new password is valid
 * @param {object} req is the request parameter
 * @param {object} res is the response parameter
 * @param {object} next is the next parameter
 * @return {object} the response object
 * @public
*/
const passwordReset = (req, res, next) => {
  const { token } = req.params;
  const decoded = jwtDecode(token);
  if (!decoded) {
    return res.status(400).send('user not avalaible');
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({ message: 'password and confirmPassword are not equal' });
  }
  if (!req.body.password || !req.body.confirmPassword) {
    return res.status(400).send({ message: 'please input passowrd and confirm password' });
  }
  req.decoded = decoded;
  return next();
};
/** @description checks if email is valid
 * @param {object} req is the request parameter
 * @param {object} res is the response parameter
 * @param {object} next is the next parameter
 * @return {object} the response object
 * @public
*/
const validEmail = (req, res, next) => {
  if (!req.body.email || !emailvalidator.validate(req.body.email)) {
    return res.status(400).send({ message: 'please input a valid email' });
  }
  return next();
};
export { passwordReset, validEmail };
