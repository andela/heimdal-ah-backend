import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test for registering a new user', () => {
  it('should return 201 on sucessfully creating a new user', async () => {
    const data = {
      email: 'testin@test.com',
      password: '123456',
      username: 'test'
    };
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    res.should.be.a('object');
    res.status.should.equal(201);
  });
  it('should return 409 if user already exists', async () => {
    const data = {
      email: 'testin@test.com',
      password: '123456',
      username: 'test'
    };
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    res.should.be.a('object');
    res.status.should.equal(409);
  });
});
