import models from '../models';
import UserModelQuery from '../lib/UserModelQuery';

const { users, roles, profiles } = models;

/**
 * @description Facebook's Authentication Function
 * @param {object} req Request Object
 * @param  {string} accessToken Facebook access token
 * @param  {string} refreshToken Facebook secret token
 * @param  {object} profileInfo Facebook profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const facebookCallback = async (req, accessToken, refreshToken, profileInfo, done) => {
  const userObject = {};
  const { id: roleId } = await roles.findOne({ where: { name: 'user' } });

  userObject.email = profileInfo.emails[0].value;
  userObject.emailVerification = true;
  userObject.roleId = roleId;

  const [firstName, lastName] = profileInfo.displayName.split(' ');

  const profile = {};
  profile.username = profileInfo.displayName.split(' ')[0] + Date.now();
  profile.image = profileInfo.photos[0].value;
  profile.firstName = firstName;
  profile.lastName = lastName;

  userObject.profile = profile;
  const facebookUser = await UserModelQuery.getUserByEmail(userObject.email);

  if (facebookUser) {
    return done(null, facebookUser);
  }

  const newUser = await users.create(
    userObject,
    { include: [{ model: profiles, as: 'profile' }] }
  );

  return done(null, newUser);
};

export default facebookCallback;
