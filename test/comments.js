import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../index';

const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('Comment Validation and Creation', () => {
  const slug = 'this-is-the-article';
  const postCommentUrl = `/api/v1/articles/${slug}/comments`;
  it('should return an error if the user adding the comment value is empty', async () => {
    const userDataWithEmptyUserName = {
      articleId: chance.natural({ min: 1, max: 20 }),
      userId: '',
      content: chance.sentence({ words: 50 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .send(userDataWithEmptyUserName);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('userId');
    res.body.errors.userId.msg.should.equal('User Id cannot be empty');
  });

  it('should return an error if the article value is empty', async () => {
    const userDataWithEmptyUserName = {
      articleId: '',
      userId: chance.natural({ min: 1, max: 20 }),
      content: chance.sentence({ words: 50 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .send(userDataWithEmptyUserName);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('articleId');
    res.body.errors.articleId.msg.should.equal('Please enter an Article Id');
  });

  it('should return an error if the content value is empty', async () => {
    const userDataWithEmptyUserName = {
      articleId: chance.natural({ min: 1, max: 20 }),
      userId: chance.natural({ min: 1, max: 20 }),
      content: ''
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .send(userDataWithEmptyUserName);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Content cannot be empty');
  });

  it('should return an error if the user does not exist in the database', async () => {
    const userDataWithEmptyUserName = {
      articleId: chance.natural({ min: 1, max: 20 }),
      userId: chance.natural({ min: 1, max: 20 }),
      content: chance.sentence({ words: 50 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .send(userDataWithEmptyUserName);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('');
    res.body.msg.should.equal('Please add the article Id ');
  });

  it('should return an error if the article does not exist in the database', async () => {
    const userDataWithEmptyUserName = {
      articleId: '',
      userId: chance.natural({ min: 1, max: 20 }),
      content: chance.sentence({ words: 50 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .send(userDataWithEmptyUserName);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('');
    res.body.msg.should.equal('Please add the article Id ');
  });

  it('should return a success if comment is created successfully', async () => {
    const userDataWithAnExistingEmail = {
      articleId: 1,
      userId: chance.natural({ min: 1, max: 20 }),
      content: chance.sentence({ words: 50 })
    };
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithAnExistingEmail);
    res.status.should.equal(201);
  });
});
