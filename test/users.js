import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test for registering a new user', () => {
  it('should return 201 on sucessfully creating a new user', async () => {
    const data = {
      email: 'test@test.com',
      password: '123456',
      username: 'test'
    };
    const res = await chai.request(app)
      .post('/api/v1/signup')
      .send(data);
    console.log(res.body);
    res.should.be.a('object');
    res.status.should.equal(201);
  });
});
