
import jwt from 'jsonwebtoken';


const getToken = (userId, username) => jwt.sign({ userId, username }, process.env.TOKEN_SECRET, {
  expiresIn: 86400
});

export default getToken;
