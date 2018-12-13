import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('/bookmarks', () => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjg3LCJ1c2VybmFtZSI6IndhbGUifQ.JXYnjKYdCz7N_4Qch-wWQYR64phDBQyPwii1RCcCiHQ';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoid2FsZSJ9.3Kpv3k1eZ7-yJNt_gHEY9szIRgH_wt8-xWfSqS4dzsk';

  it('should return status code 401 when user is not logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/bookmarks/');

    res.status.should.equal(400);
    res.body.should.be.a('object');
  });

  it('should return a 400 when user is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/bookmarks/1')
      .set('access-token', userToken);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Please Article cannot be bookmarked');
  });

  it('should return 200 when user is logged in', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/bookmarks/1')
      .set('access-token', token);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('hurray! bookmark was added successfully');
  });

  it('should return a 400 when article is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/bookmarks/67')
      .set('access-token', token);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Please Article cannot be bookmarked');
  });

  it('should return status code 200 when user is logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/bookmarks/')
      .set('access-token', token);

    res.status.should.equal(200);
    res.body.should.be.a('object');
  });

  it('should return should return a 200 when bookmark is avalaible', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/bookmarks/1')
      .set('access-token', token);

    res.status.should.equal(200);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('bookmark was deleted successfully');
  });

  it('should return should return a 200 when bookmark is not avalaible', async () => {
    const res = await chai
      .request(app)
      .delete('/api/v1/bookmarks/676')
      .set('access-token', token);

    res.status.should.equal(404);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('bookmark was not found');
  });
});
