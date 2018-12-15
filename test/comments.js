import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../index';
import db from '../models';
import getToken from '../helpers/getToken';

const { articles, users: User, comments: Comment } = db;
const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('Comment Validation and Creation', () => {
  let token;
  let id;
  let article;
  let user;
  before(async () => {
    const userInfo = {
      email: chance.email(),
      password: chance.hash(),
      username: chance.last(),
    };
    user = await User.create(userInfo);
    const data = {
      title: 'This is a new title',
      description: 'This is a new description',
      body: 'This is a powerful new article',
      slug: 'dummy-slug',
      readingTime: '2 mins',
      userId: user.id
    };
    article = await articles.create(data);
    await article.setUser(user);
    ({ id } = article);
    token = getToken(user.id, user.username);
  });
  const postCommentUrl = `/api/v1/articles/${id}/comments`;


  it('should return an error if the content value is empty', async () => {
    const contentDataWithEmpty = {
      content: ''
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .set('access-token', token)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Please enter the comment content');
  });

  it('should return an error if the content value is too long', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 1000 })
    };
    const res = await chai.request(app)
      .post(postCommentUrl)
      .set('access-token', token)
      .send(contentDataWithEmpty);
    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.should.have.property('errors');
    res.body.errors.should.be.a('object');
    res.body.errors.should.have.property('content');
    res.body.errors.content.msg.should.equal('Content Length cannot be more than 1500 characters');
  });

  it('should return an error if the article does not exist in the database', async () => {
    const contentDataWithEmpty = {
      content: chance.sentence({ words: 20 })
    };
    const falseId = 500;
    const res = await chai.request(app)
      .get(`/api/v1/articles/${falseId}/comments`)
      .set('access-token', token)
      .send(contentDataWithEmpty);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Could not find article');
  });

  it('should return an error if the comment does not exist in the database', async () => {
    const res = await chai.request(app)
      .delete(`/api/v1/articles/${id}/comments/${500}`)
      .set('access-token', token);
    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('No Comment exist');
  });

  it('it should return a success for successful creation of a comment', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      articleId: article.id,
      userId: user.id
    };
    const res = await chai.request(app)
      .post(`/api/v1/articles/${id}/comments`)
      .set('access-token', token)
      .send(commentData);
    res.status.should.equal(201);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Comment has been successfully created');
  });

  it('it should return a success for successful listing of the comment', async () => {
    const res = await chai.request(app)
      .get(`/api/v1/articles/${id}/comments`)
      .set('access-token', token);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('All Comment for the Article');
  });

  it('it should return a success for successful deletion of a comment', async () => {
    const commentData = {
      content: chance.sentence({ words: 20 }),
      articleId: article.id,
      userId: user.id
    };
    const data = {
      isArchived: true
    };
    const comment = await Comment.create(commentData);
    const res = await chai.request(app)
      .delete(`/api/v1/articles/${article.id}/comments/${comment.id}`)
      .set('access-token', token)
      .send(data);
    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('Successfully deleted');
  });
});
