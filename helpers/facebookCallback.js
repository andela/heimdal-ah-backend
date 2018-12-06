import models from '../models';

const { users } = models;

/**
 * @description Facebook's Authentication Function
 * @param {object} req Request Object
 * @param  {string} accessToken Facebook access token
 * @param  {string} refreshToken Facebook secret token
 * @param  {object} profile Facebook profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const facebookCallback = async (req, accessToken, refreshToken, profile, done) => {
  const facebookUser = await users.findOne({
    where: {
      facebookId: profile.id
    }
  });

  if (facebookUser) {
    return done(null, facebookUser);
  }

  const newUser = {};
  newUser.email = profile.emails[0].value;
  newUser.username = profile.displayName;
  newUser.facebookId = profile.id;
  newUser.emailVerification = true;

  const user = await users.create(newUser);
  return done(null, user);
};

export default facebookCallback;
