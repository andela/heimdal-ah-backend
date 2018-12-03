import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import bodyHelper from './bodyHelper';

chai.use(chaiHttp);

const { expect } = chai;

// describe('GET /', () => {
//   it('should return 200 for visiting a random endpoint on the app', (done) => {
//     chai
//       .request(app)
//       .get('/')
//       .end((err, result) => {
//         expect(result).to.have.status(200);
//         expect(result.body).to.be.an('object');
//         expect(result.body.success).to.be.equal(true);
//         done();
//       });
//   });
// });

describe('POST /users/signup', () => {
  it('should return 201 for creating a user', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .send(bodyHelper.signUp.validUser)
      .end((err, result) => {
        expect(result).to.have.status(201);
        expect(result.body).to.be.an('object');
        expect(result.body.success).to.be.equal(true);
        bodyHelper.emailToken.validTokenInDb = result.body.emailToken;
        done();
      });
  });
});

// describe('GET /verify-email/:emailToken', () => {
//   it('should return 400 if the emailToken sent is invalid', (done) => {
//     chai
//       .request(app)
//       .get(`/api/users/verify-email/${bodyHelper.emailToken.invalidToken}`)
//       .end((err, result) => {
//         expect(result).to.have.status(400);
//         expect(result.body).to.be.an('object');
//         expect(result.body.success).to.be.equal(false);
//         done();
//       });
//   });
//   it('should return 404 if the emailToken sent is valid but the user does not exist in the database', (done) => {
//     chai
//       .request(app)
//       .get(`/api/users/verify-email/${bodyHelper.emailToken.randomValidToken}`)
//       .end((err, result) => {
//         expect(result).to.have.status(404);
//         expect(result.body).to.be.an('object');
//         expect(result.body.success).to.be.equal(false);
//         done();
//       });
//   });
//   it('should update the user emailVerification to true when the emailToken is valid and the user is found in the database', (done) => {
//     chai
//       .request(app)
//       .get(`/api/users/verify-email/${bodyHelper.emailToken.validTokenInDb}`)
//       .end((err, result) => {
//         expect(result).to.have.status(200);
//         expect(result.body).to.be.an('object');
//         expect(result.body.success).to.be.equal(true);
//         done();
//       });
//   });
// });
