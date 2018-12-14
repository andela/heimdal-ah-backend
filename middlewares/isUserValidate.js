import isUser from '../lib/isUser';
import StatusResponse from '../helpers/StatusResponse';

/** @description checks if user exist in database
 * @param {object} req is the request parameter
 * @param {object} res is the response parameter
 * @param {object} next is the next parameter
 * @return {object} the response object
 * @public
 */
const isUserValidate = async (req, res, next) => {
  const { userId } = res.locals.user;
  try {
    const user = await isUser(userId);
    if (user !== 'success') {
      return StatusResponse.badRequest(res, { message: 'user is not logged in' });
    }
    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, { message: 'sever error' });
  }
};

export default isUserValidate;
