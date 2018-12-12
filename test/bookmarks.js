import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('/bookmarks', () => {
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.VxUrXPHtXVNmTSFGBeBS0bn5_XvIz39AcMOwZNTVMAI';
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoidXNlciJ9.au5ynl_APO5fpeFLL_Ky9Gk3pdQoHDICIuXgT3OlEnk';

  it('should return status code 401 when user is not logged in', async () => {
    const res = await chai
      .request(app)
      .get('/api/v1/bookmarks/');

    res.status.should.equal(401);
    res.body.should.be.a('object');
  });

  it('should return a 400 when user is not avaliable', async () => {
    const res = await chai
      .request(app)
      .post('/api/v1/bookmarks/1')
      .set('access-token', userToken);

    res.status.should.equal(400);
    res.body.should.be.a('object');
    res.body.message.should.be.equal('Please User is not logged in');
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
    res.body.should.be.a('array');
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
