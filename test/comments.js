import chai from 'chai';
import chaiHttp from 'chai-http';
import Chance from 'chance';
import app from '../index';

const chance = Chance();
chai.use(chaiHttp);
chai.should();

describe('Comment Validation and Creation', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidG9sdSIsImlhdCI6MTU0NDUxNzU4MSwiZXhwIjoxNTQ0NjAzOTgxfQ.IAMY8E62t3YTxiJOUjRsoj0EHjVpueeKwuZ1-X7ueUs';
  const slug = 'this-is-the-article';
  const postCommentUrl = `/api/v1/articles/${slug}/comments`;
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
});
