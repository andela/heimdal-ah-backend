import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import statusResponse from '../helpers/StatusResponse';

dotenv.config();

const checkAuthentication = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['access-token'];

  // Decode token
  jwt.verify(token, process.env.TOKEN_SECRET, (err) => {
    // If there is no token, forbid the user from accessing the routes
    if (!token) {
      statusResponse.badRequest(res, {
        message: 'You did not provide any token, please enter token, then retry',
        errors: {
          body: ['Invalid input']
        }
      });
    } else if (err) {
      // Wrong token
      statusResponse.unauthorized(res, {
        errors: {
          body: ['User token not authenticated, wrong token']
        }
      });
    }
    // Call the next middleware
    return next();
  });
};

export default checkAuthentication;
