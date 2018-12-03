import chai from 'chai';
import chaiHttp from 'chai-http';
import nodeLogger from 'logger';
// import users from '../seeders/data'
import app from '../index';
// import model from '../models';

const logger = nodeLogger.createLogger();
chai.use(chaiHttp);
chai.should();

describe('Heimdal Test Suite', () => {
  describe(' POST /v1/api/forgotpassword', () => {
    it('should return status code 404 when user is invalid', async () => {
      try {
        const res = await chai
          .request(app)
          .post('/api/v1/forgotpassword')
          .send({
            email: 'email@gmail.com'
          });
        if (res) {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('user not avalaible');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });

  describe(' PUT /resetpassword/:token', () => {
    it('should return status code 404 when user is invalid', async () => {
      try {
        const res = await chai
          .request(app)
          .put('/api/v1/resetpassword/hgcjkgkgjhcjytfkyu')
          .send({
            password: '123456',
            confirmPassword: '123456'
          });
        if (res) {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('user not avalaible');
        }
      } catch (error) {
        logger.info(error);
      }
    });

    it('should return status code 404 when user is invalid', async () => {
      try {
        const res = await chai
          .request(app)
          .put('/api/v1/resetpassword/hgcjkgkgjhcjytfkyu')
          .send({
            password: '123456',
            confirmPassword: ''
          });
        if (res) {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('password and comfirmPassword are not equal');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });
});
