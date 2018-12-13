import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusResponse from '../helpers/StatusResponse';

dotenv.config();

const checkAuthentication = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.headers['access-token'];
  if (!token) {
    StatusResponse.badRequest(res, {
      message: 'You did not provide any token, please enter token, then retry',
      errors: {
        body: ['Invalid input']
      }
    });
  }

  // Decode token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // Wrong token
      StatusResponse.unauthorized(res, {
        errors: {
          body: ['User token not authenticated, wrong token']
        }
      });
    }

    // req.userId = decoded.userId;
    // req.username = decoded.username;
    res.locals.user = {
      userId: decoded.userId,
      username: decoded.username
    };
    // Call the next middleware
    return next();
  });
};

export default checkAuthentication;
