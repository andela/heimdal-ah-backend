import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

chai.should();

describe('GET /', () => {
  it('should return 200 for visiting a random endpoint on the app', async () => {
    const res = await chai.request(app).get('/');

    res.should.be.a('object');
    res.status.should.equal(200);
  });
});

// describe('POST /auth/signup', () => {
//   it('should return 201 for creating a user', async () => {
//     const res = await chai
//       .request(app)
//       .post('/api/v1/auth/signup')
//       .send(bodyHelper.signUp.validUser);

//     res.should.be.a('object');
//     res.status.should.equal(201);
//     bodyHelper.emailToken.validTokenInDb = res.body.emailToken;
//   });
// });

describe('Test for registering a new user', () => {
  it('should return 201 on sucessfully creating a new user', async () => {
    const data = {
      email: 'testin@test.com',
      password: 'etydhfkjdkvl1',
      username: 'test'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    // console.log('----->', res.body);
    res.should.be.a('object');
    res.status.should.equal(201);
    bodyHelper.emailToken.validTokenInDb = res.body.emailToken;
  });
  it('should return error if user enters an existing email', async () => {
    const userDataWithAnExistingEmail = {
      email: 'testin@test.com',
      password: 'omotayo123',
      username: 'Omotayo'
    };

    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithAnExistingEmail);
    res.status.should.equal(409);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('This email has been taken');
  });
});

describe('GET api/vi/users/verify-email/:emailToken', () => {
  it('should return 400 if the emailToken sent is invalid', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.invalidToken}`);

    res.should.be.a('object');
    res.status.should.equal(400);
  });
  it('should return 404 if the emailToken sent is valid but the user does not exist in the database', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.randomValidToken}`);
    console.log('----->', res.body);
    res.should.be.a('object');
    res.status.should.equal(404);
  });
  it('should update the user emailVerification to true when the emailToken is valid and the user is found in the database', async () => {
    const res = await chai
      .request(app)
      .get(`/api/v1/users/verify-email/${bodyHelper.emailToken.validTokenInDb}`);

    res.should.be.a('object');
    res.status.should.equal(200);
  });
});
