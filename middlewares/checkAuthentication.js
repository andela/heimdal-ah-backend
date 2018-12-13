
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusResponse from '../helpers/StatusResponse';

dotenv.config();
const checkAuthentication = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.headers['access-token'];
  if (!token) {
    return StatusResponse.badRequest(res, {
      message: 'You did not provide any token, please enter token, then retry',
      errors: {
        body: ['Invalid input']
      }
    });
  }
  // Decode token
  return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Wrong token
      return StatusResponse.unauthorized(res, {
        errors: {
          body: ['User token not authenticated, wrong token']
        }
      });
    }
    req.userId = decoded.userId;
    req.username = decoded.username;
    res.locals.user = {
      userId: req.userId,
      username: req.username
    };

    // Call the next middleware
    return next();
  });
};
export default checkAuthentication;
