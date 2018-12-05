// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import index from '../index';

// // const [expect] = [chai.expect];
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();

chai.use(chaiHttp);

describe('Test for registering a new user', () => {
  it('should return 201 on sucessfully creating a new user', async () => {
    const data = {
      email: 'testin@test.com',
      password: 'etydhfkjdkvl1',
      username: 'test'
    };
    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data);
    if (res) {
      res.body.should.be.a('object');
      res.status.should.equal(200);
    }
  });
  // it('should return 409 if user already exists', async () => {
  //   const data = {
  //     email: 'testin@test.com',
  //     password: 'etydhfkjdkvl1',
  //     username: 'test'
  //   };
  //   const res = await chai.request(app)
  //     .post('/api/v1/auth/signup')
  //     .send(data);
  //   res.should.be.a('object');
  //   res.status.should.equal(409);
  // });
  it('should return error if user enters an existing email', async () => {
    const userDataWithAnExistingEmail = {
      email: 'testin@test.com',
      password: 'omotayo123',
      username: 'Omotayo'
    };

    const res = await chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userDataWithAnExistingEmail);
    res.status.should.equal(409);
    res.body.should.be.a('object');
    res.body.should.be.a('object');
    res.body.should.have.property('message');
    res.body.message.should.equal('This email has been taken');
  });
});
