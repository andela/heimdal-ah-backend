
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/UserModelQuery';

dotenv.config();
const checkAuthentication = async (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.headers['access-token'];
  if (!token) {
    StatusResponse.badRequest(res, {
      message: 'You did not provide any token, please enter token, then retry',
      errors: {
        body: ['Invalid input']
      }
    });
  } else {
    // Decode token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        // Wrong token
        return StatusResponse.unauthorized(res, {
          errors: {
            body: ['User token not authenticated, wrong token']
          }
        });
      }

      const user = await UserModelQuery.getUserById(decoded.userId);

      if (!user) {
        return StatusResponse.unauthorized(res, { message: 'user does not exist' });
      }

      req.userId = decoded.userId;
      req.username = decoded.username;
      // req.app.locals = {}
      req.app.locals.user = {
        userId: req.userId,
        username: req.username
      };

      // Call the next middleware
      return next();
    });
  }
};
export default checkAuthentication;
