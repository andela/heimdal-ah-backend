import chai from 'chai';
import chaiHttp from 'chai-http';
import jwtDecode from 'jwt-decode';
import app from '../index';

chai.use(chaiHttp);
chai.should();
let id;
let userToken;
let articlesId;

describe('Heimdal Test Suite', () => {
  before(async () => {
    // Create a user
    const res = await chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'temaiilsksk@test.com',
        password: 'Password24##',
        username: 'sunny42'
      });
    userToken = res.body.token;
    id = jwtDecode(userToken).userId;

    // Create an article
    const response = await chai
      .request(app)
      .post(`/api/v1/articles/${id}`)
      .send({
        title: 'My first interesting article',
        description: 'My first article description that is long and interesting',
        slug: 'My-first-interesting-article',
        body: 'My first article body that contains more words that the former'
      });
    articlesId = response.body.article.id;
  });

  // ==== Give a rating to an article ==== //
  describe(' POST /ratings/articles/:articleId - Give a rating to an article', () => {
    it('should return status code 201 on user rating an article', async () => {
      const res = await chai.request(app)
        .post(`/api/v1/ratings/articles/${articlesId}`)
        .set('access-token', userToken)
        .send({
          userId: id,
          stars: 4
        });
      res.status.should.equal(201);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('ratings');
      res.body.message.should.equal('Users ratings on this article recorded succesfully');
    });

    it('should return status code 400 if no token is provided', async () => {
      const res = await chai.request(app)
        .post(`/api/v1/ratings/articles/${articlesId}`)
        .set('access-token', '')
        .send({
          userId: id,
          stars: 4
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.should.have.property('errors');
      res.body.message.should.equal('You did not provide any token, please enter token, then retry');
    });

    it('should return status code 401 if token provided is invalid', async () => {
      const res = await chai.request(app)
        .post(`/api/v1/ratings/articles/${articlesId}`)
        .set('access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ._kgewreaeki8_kNXtPCbilKgvkocJxKodpmqer9YpMo')
        .send({
          userId: id,
          stars: 4
        });
      res.status.should.equal(401);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.body[0].should.equal('User token not authenticated, wrong token');
    });

    it('should return status code 400 if article id is not an integer', async () => {
      const res = await chai.request(app)
        .post('/api/v1/ratings/articles/notaninteger')
        .set('access-token', userToken)
        .send({
          userId: id,
          stars: 4
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.should.have.property('body');
      res.body.errors.body[0].should.equal('Articles Id must be an integer');
    });

    it('should return status code 400 if no star rating is provided', async () => {
      const res = await chai.request(app)
        .post(`/api/v1/ratings/articles/${articlesId}`)
        .set('access-token', userToken)
        .send({
          userId: id,
          stars: ''
        });
      res.status.should.equal(400);
      res.body.should.be.a('object');
      res.body.should.have.property('errors');
      res.body.errors.body[0].should.equal('Invalid input');
    });
  });
});
