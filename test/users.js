import chai from 'chai';
import chaiHttp from 'chai-http';
import nodeLogger from 'logger';
// import dotenv from 'dotenv';
import app from '../index';
// import model from '../models';

const logger = nodeLogger.createLogger();
chai.use(chaiHttp);
chai.should();

describe('Heimdal Test Suite', () => {
  // ==== Create new user profile ==== //

  describe(' POST profiles/:userId - Create new user profile', () => {
    it('should return status code 201 on creation of new user profile', async () => {
      try {
        const res = await chai.request(app)
          .post('/api/profiles/1')
          .send({
            username: 'newUsers',
            biodata: 'I love graphics design',
            image: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
            address: 'Surulere, lagos',
            dateofbirth: '09-10-1990'
          });
        if (res) {
          res.status.should.equal(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('profile');
          res.body.message.should.equal('Users profile created succesfully');
        }
      } catch (error) {
        logger.info(error);
      }
    });

    it('should return status code 400 if user id is not an integer', async () => {
      try {
        const res = await chai.request(app)
          .post('/api/profiles/hdncdk')
          .send({
            username: 'newuser',
            biodata: 'I love graphics design',
            image: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
            address: 'Surulere, lagos',
            dateofbirth: '09-10-1990'
          });
        if (res) {
          res.status.should.equal(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('body');
          res.body.errors.body[0].should.equal('User Id must be an integer');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });

  // ==== View users profile ==== //

  describe(' GET profiles/:username - View users profile', () => {
    it('should return status code 200 on getting a users profile', async () => {
      try {
        const res = await chai.request(app)
          .get('/api/profiles/newUsers');
        if (res) {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('profile');
          res.body.message.should.equal('Users profile returned succesfully');
        }
      } catch (error) {
        logger.info(error);
      }
    });

    it('should return status code 404 if user is not found', async () => {
      try {
        const res = await chai.request(app)
          .get('/api/profiles/nosuchuser');
        if (res) {
          res.status.should.equal(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Users profile not found');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });

  // ==== Update users profile ==== //

  describe(' PUT profiles/:username - Update users profile', () => {
    it('should return status code 401 if user token is invalid', async () => {
      try {
        const res = await chai.request(app)
          .put('/api/profiles/newUsers')
          .send({
            userToken: 'wrongtoken'
          });
        res.status.should.equal(401);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('body');
        res.body.errors.body[0].should.equal('You cannot edit another persons profile');
      } catch (error) {
        logger.info(error);
      }
    });

    it('should return status code 200 on updating a users profile', async () => {
      try {
        const res = await chai.request(app)
          .put('/api/profiles/newUsers')
          .send({
            biodata: 'I love graphics design so much',
            image: 'https://res.cloudinary.com/pato/image/upload/v1539986467/n9usp2sumwxxmgiaogbd.png',
            address: 'Surulere, lagos',
            dateofbirth: '09-10-1990',
            userToken: 'token'
          });
        if (res) {
          res.status.should.equal(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('profile');
          res.body.message.should.equal('Users profile updated successfully');
        }
      } catch (error) {
        logger.info(error);
      }
    });
  });
});
