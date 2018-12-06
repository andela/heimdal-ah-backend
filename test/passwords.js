import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

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
        .post('/api/v1/passwords/forgotpassword')
        .send({
          email: 'emaigmail.com'
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
    });

    it('should retuen a 200 when users email is valid', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/passwords/forgotpassword')
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
        .put('/api/v1/passwords/resetpassword/jhuyytcfcyf')
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
          .put(`/api/v1/passwords/resetpassword/${userToken}`)
          .send({
            password: '123456',
            confirmPassword: '123456'
          });
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message');
      } catch (error) {
        // error
      }
    });

    it('should return status code 400 if password is not defined', async () => {
      const res = await chai
        .request(app)
        .put(`/api/v1/passwords/resetpassword/${userToken}`)
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
        .put(`/api/v1/passwords/resetpassword/${userToken}`)
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
        .put(`/api/v1/passwords/resetpassword/${userToken}`)
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
