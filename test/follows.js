/* eslint-disable prefer-destructuring */
import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../models';
import app from '../index';
import getToken from '../helpers/getToken';

const { users } = db;
chai.use(chaiHttp);

chai.use(chaiHttp);
chai.should();

describe('Test To Follow, Unfollow user, View Followes, and view following', async () => {
  let token;
  before(async () => {
    const data = {
      username: 'sunny',
      password: 'sunny12345',
      email: 'sunny@gmail.com'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    token = res.body.token;
  });

  describe('Test to login an existing user', () => {
    it('should return 200 on following a user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/users/2/follow')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });
    it('should return 200 on getting all followers', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/users/followers')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });

    it('should return 200 on getting all users following you', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/users/following')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
    });

    it('should return 200 on unfollowing a users', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/users/2/unfollow')
        .set('access-token', token);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      //   console.log(res.body);
      res.body.should.have.property('message');
    });
  });
});
