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
    it('should return status code 400 when email is invalid', async () => {
      try {
        const res = await chai
          .request(app)
          .post('/api/v1/forgotpassword')
          .send({
            email: 'emaigmail.com'
          });
        if (res) {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          // nres.body.should.have.property('message');
          // res.body.message.should.equal(''please input a valid email'');
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
          .put('/api/v1/resetpassword/jhuyytcfcyf')
          .send({
            password: '123456',
            confirmPassword: '123456'
          });
        if (res) {
          res.status.should.equal(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('error decoding token');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });
});
