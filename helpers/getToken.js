import jwt from 'jsonwebtoken';

const getToken = (userId, username, email, image, roleId) => jwt.sign(
  {
    userId,
    username,
    email,
    image,
    roleId,
  },
  process.env.TOKEN_SECRET,
  {
    expiresIn: 86400
  }
);

export default getToken;
