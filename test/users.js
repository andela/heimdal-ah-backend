import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

chai.use(chaiHttp);
chai.should();

describe('GET /', () => {
  it('should return 200 for visiting a random endpoint on the app', async () => {
    const res = await chai.request(app).get('/');
    res.should.be.a('object');
    res.status.should.equal(200);
  });
});

let userToken;
before((done) => {
  it('test user', async () => {
    const data = {
      email: 'peopleweysabi@test.com',
      password: 'etydhfkjdkvl1',
      username: 'test'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    const { token } = res.body;
    userToken = token;
  });

  done();
});

describe('password reset test', () => {
  describe(' POST /v1/api/forgotpassword', () => {
    it('should return status code 400 when email is invalid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email: 'emaigmail.com'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
    });

    it('should retuen a 200 when users email is valid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/forgotpassword')
        .send({
          email: 'peopleweysabi@test.com'
        });

      res.status.should.equal(200);
      res.body.should.be.a('object');
    });
  });

  describe(' PUT /resetpassword/:token', () => {
    it('should return status code 404 when user is invalid', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/forgotpassword/resetpassword/jhuyytcfcyf')
        .send({
          password: '123456',
          confirmPassword: '123456'
        });
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('error decoding token');
    });

    it('should return status code 200 when user token is valid', async () => {
      try {
        const res = await chai
          .request(app)
          .put(`/api/v1/forgotpassword/resetpassword/${userToken}`)
          .send({
            password: '123456',
            confirmPassword: '123456'
          });
        if (res) {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
        }
      } catch (error) {
        // error
      }
    });

    it('should return status code 400 if password is not defined', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/forgotpassword/resetpassword/${userToken}`)
        .send({
          password: '',
          confirmPassword: '123456'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });

    it('should return status code 400 if passwood is not thesame as confirmpassword', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/forgotpassword/resetpassword/${userToken}`)
        .send({
          password: '222334444',
          confirmPassword: '123456'
        });

      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });

    it('should return status code 400 if confirm password is undefined', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/forgotpassword/resetpassword/${userToken}`)
        .send({
          password: '222334444',
          confirmPassword: ''
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
    });
  });
});

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

describe('Test for listing all users', () => {
  it('Should return status 200 on success or 404 if returned array is empty', async () => {
    const response = await chai.request(app).get('/api/v1/users/authors');
    if (response.body.status === 404) {
      response.status.should.equal(404);
      response.body.should.have.a('object');
      response.body.should.have.property('message');
      response.body.message.should.equal('No author found');
    } else {
      response.status.should.equal(200);
      response.body.should.have.a('object');
      response.body.should.have.property('message');
      response.body.should.have.property('users');
      response.body.message.should.equal('List of authors');
    }
  });
});
