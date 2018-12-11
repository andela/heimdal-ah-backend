import chai from 'chai';
import chaiHttp from 'chai-http';
import jwtDecode from 'jwt-decode';

import app from '../index';

chai.use(chaiHttp);

describe('Test for articles controller', () => {
  let id;
  let slugString;
  before(async () => {
    const data = {
      email: 'testingemail@test.com',
      password: 'Password24##',
      username: 'sunny42'
    };
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    const { token } = res.body;
    id = jwtDecode(token).userId;
  });

  before(async () => {
    const data = {
      title: 'This is a new title',
      description: 'This is a new description',
      body: 'This is a powerful new article'
    };
    const res = await chai
      .request(app)
      .post(`/api/v1/articles/${id}`)
      .send(data);
    const { slug } = res.body.article;
    slugString = slug;
  });

  describe('Test for creating new articles POST/ api/v1/articles', () => {
    it('should return error if no input field is provided', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles/1')
        .send();
      res.status.should.equal(400);
      res.body.should.have.a('object');
      res.body.errors.title.msg.should.equal('title cannot be empty');
      res.body.errors.description.msg.should.equal('description cannot be empty');
    });

    it('should return 201 on successful creation of articles', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/articles/1')
        .send({
          title: 'This is a title',
          description: 'This is a description',
          body: ' his is a powerful article'
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
        .get('/api/v1/articles/hello-nnnn-snhjs-as');
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });

    it('should return 200 on successful retrieval of an article', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/articles/${slugString}`);
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
        .get('/api/v1/articles');
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
        .get('/api/v1/articles/nfnfjfhg-djdh-djdj');
      res.status.should.equal(404);
      res.body.should.have.a('object');
      res.body.message.should.equal('Could not find article');
    });

    // it('should return 200 on successful update of article', async () => {
    //   const res = await chai
    //     .request(app)
    //     .put('/api/v1/articles')
    //     .send({});
    //   res.status.should.equal(200);
    //   res.body.should.have.a('object');
    //   res.body.should.have('message');
    //   res.body.message.should.equal('Article updated successfully');
    // });
  });

  // describe('Test for deleting articles DELETE/ api/v1/articles:slug', () => {
  //   it('should return 404 if article to be deleted is not found', async () => {
  //     const res = await chai
  //       .request(app)
  //       .get(`/api/v1/articles/${slug}`);
  //     res.status.should.equal(400);
  //     res.body.should.have.a('object');
  //     res.body.error.body[0].should.equal('Article does not exist');
  //   });

  //   it('should return 204 on successful deletion of an article', async () => {
  //     const res = await chai
  //       .request(app)
  //       .post('/api/v1/articles')
  //       .send({});
  //     res.status.should.equal(204);
  //     res.body.should.have.a('object');
  //     res.body.should.have('message');
  //     res.body.message.should.equal('Article deleted successfully');
  //   });
  // });
});
