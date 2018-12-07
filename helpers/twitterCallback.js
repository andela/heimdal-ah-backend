import models from '../models';

const { users } = models;

/**
 * @description Twitter's Authentication Function
 * @param {object} req Request Object
 * @param  {string} token Twitter token
 * @param  {string} tokenSecret Twitter secret token
 * @param  {object} profile Twitter profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const twitterCallback = async (req, token, tokenSecret, profile, done) => {
  const twitterUser = await users.findOne({
    where: {
      twitterId: profile.id
    }
  });

  if (twitterUser) {
    return done(null, twitterUser);
  }

  const newUser = {};
  newUser.username = profile.displayName;
  newUser.twitterId = profile.id;
  newUser.emailVerification = true;

  const user = await users.create(newUser);
  return done(null, user);
};

export default twitterCallback;
