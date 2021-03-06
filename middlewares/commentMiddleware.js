import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/UserModelQuery';

dotenv.config();
const commentMiddleware = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    next();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
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
      req.roleId = decoded.roleId;
      req.app.locals.user = {
        userId: decoded.userId,
        username: decoded.username,
        roleId: req.roleId
      };
      return next();
    });
  }
};
export default commentMiddleware;
