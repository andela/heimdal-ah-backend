import testHelper from './testHelper';

const bodyHelper = {
  emailToken: {
    validTokenInDb: undefined,
    randomValidToken: testHelper.randomValidToken,
    invalidToken: testHelper.invalidToken
  },
  signUp: {
    validUser: {
      username: 'Henry',
      email: testHelper.userEmail,
      password: testHelper.password
    }
  }
};

export default bodyHelper;
