import models from '../models';

const { users } = models;

/**
 * @description Google's Authentication Function
 * @param {object} req Request Object
 * @param  {string} accessToken Google access token
 * @param  {string} refreshToken Google secret token
 * @param  {object} profile Google profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const googleCallback = async (req, accessToken, refreshToken, profile, done) => {
  const googleUser = await users.findOne({
    where: {
      googleId: profile.id
    }
  });

  if (googleUser) {
    return done(null, googleUser);
  }

  const newUser = {};
  newUser.email = profile.emails[0].value;
  newUser.username = profile.displayName;
  newUser.googleId = profile.id;
  newUser.emailVerification = true;

  const user = await users.create(newUser);
  return done(null, user);
};

export default googleCallback;
