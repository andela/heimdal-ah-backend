import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();
describe('Heimdal Role based access control functionality Test Suite', () => {
  let adminToken;

  before(async () => {
    const userData = {
      email: 'admin@heimdal.com',
      password: '12345678heimdal',
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    adminToken = token;
  });
  // ==== Retrieve users ==== //
  describe(' GET /users/ - Retrieve users', () => {
    it('should return status code 200 on returning all users', async () => {
      const res = await chai.request(app)
        .get('/api/v1/admin/users/')
        .set('access-token', adminToken);
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('users');
      res.body.message.should.equal('success');
    });

    it('should return status code 400 if user id is not an integer', async () => {
      const res = await chai.request(app)
        .get('/api/v1/admin/users/nm')
        .set('access-token', adminToken);
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
    });

    it('should return status code 200 on returning a specific user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/admin/users/1')
        .set('access-token', adminToken);
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('user');
      res.body.user.should.have.property('id');
      res.body.user.should.have.property('role');
      res.body.user.should.have.property('profile');
      res.body.user.id.should.equal(1);
      res.body.message.should.equal('success');
    });

    it('should return status code 404 on not finding a specific user', async () => {
      const res = await chai.request(app)
        .get('/api/v1/admin/users/1655555555')
        .set('access-token', adminToken);
      res.status.should.equal(404);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('User not found');
    });
  });
  // ==== Update users ==== //
  describe(' PUT /users/:userId - Update users', () => {
    it('should return status code 200 on updating a specific user role', async () => {
      const res = await chai.request(app)
        .put('/api/v1/admin/users/2')
        .set('access-token', adminToken)
        .send({
          role: 'admin',
        });
      res.status.should.equal(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('user');
      res.body.message.should.equal('success');
    });
  });

  // ===== Publish access ==== //
  describe('Test for publishing an article PUT/ api/v1/articles:slug', () => {
    it('should return 404 if article to be published is not found', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/50/publish')
        .set('access-token', adminToken)
        .send();
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 200 if article is published successfully', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/2/publish')
        .set('access-token', adminToken)
        .send({
          isPublished: true
        });
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article published successfully!');
    });
  });

  describe('Test for unpublishing an article PUT/ api/v1/articles:slug', () => {
    it('should return 404 if article to be unpublished is not found', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/50/unpublish')
        .set('access-token', adminToken)
        .send();
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 200 if article is unpublished successfully', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/2/unpublish')
        .set('access-token', adminToken)
        .send({
          isPublished: false
        });
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article unpublished successfully!');
    });
  });
});
