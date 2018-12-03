import TestHelper from './TestHelper';

const bodyHelper = {
  emailToken: {
    validTokenInDb: undefined,
    randomValidToken: TestHelper.randomValidToken,
    invalidToken: TestHelper.invalidToken
  },
  signUp: {
    validUser: {
      name: 'Henry',
      email: TestHelper.userEmail,
      password: TestHelper.password
    }
  }
};

export default bodyHelper;
