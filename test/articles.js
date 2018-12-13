import chai from 'chai';
import chaiHttp from 'chai-http';
// import jwtDecode from 'jwt-decode';

import app from '../index';

chai.use(chaiHttp);

describe('Test for articles controller', () => {
  let userToken;
  before(async () => {
    const userData = {
      email: 'publisherb@heimdal.com',
      password: 'omotayo123',
    };
    const userResponse = await chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(userData);
    const { token } = userResponse.body;
    userToken = token;
  });

  describe('Test for creating new articles POST/ api/v1/articles', () => {
    it('should return error if no input field is provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send();
      res.status.should.equal(400);
      res.body.should.have.a('object');
      res.body.errors.title.msg.should.equal('title cannot be empty');
      res.body.errors.description.msg.should.equal('description cannot be empty');
    });

    it('should return 201 on successful creation of articles', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article',
          image: 'www.image'
        });
      res.status.should.equal(201);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article successfully created');
    });
  });

  describe('Test for fetching a single article GET/ api/v1/articles/:slug', () => {
    it('should return 404 if an article is not found', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles/hello-nnnn-snhjs-as')
        .set('access-token', userToken);
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });

    it('should return 200 on successful retrieval of an article', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles/this-is-a-post-title-l78hgybf')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('success');
    });
  });

  describe('Test for fetching all articles GET/ api/v1/articles', () => {
    it('should return 200 on successful retrieval of articles', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/articles')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('List of articles');
    });
  });

  describe('Test for updating an article PUT/ api/v1/articles:slug', () => {
    it('should return 404 if article to be edited is not found', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/hello-world-new-article-46i05')
        .set('access-token', userToken)
        .send({
          title: 'This is a title'
        });
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 403 if user tries to edit article authored by a different user', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/this-is-the-second-post-title-mbjb7y')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article'
        });
      res.status.should.equal(403);
      res.body.should.have.a('object');
      res.body.message.should.equal('Request denied');
    });
    it('should return 200 on successful update of article', async () => {
      const res = await chai
        .request(app)
        .put('/api/v1/articles/this-is-trd-post-title-u87ddsa')
        .set('access-token', userToken)
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article'
        });
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article updated successfully');
    });
  });

  describe('Test for deleting articles DELETE/ api/v1/articles:identifier', () => {
    it('should return 404 if article to be deleted is not found', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/ncsfn-jsjns--sn')
        .set('access-token', userToken);
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });
    it('should return 403 if user tries to archive an article authored by a different user', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/this-is-the-second-post-title-mbjb7y')
        .set('access-token', userToken);
      res.status.should.equal(403);
      res.body.should.have.a('object');
      res.body.message.should.equal('Request denied');
    });
    it('should return 200 on successful archiving an article', async () => {
      const res = await chai
        .request(app)
        .delete('/api/v1/articles/this-is-trd-post-title-u87ddsa')
        .set('access-token', userToken);
      res.status.should.equal(200);
      res.body.should.have.a('object');
      res.body.should.have.property('message');
      res.body.message.should.equal('Article archived successfully');
    });
  });
});
