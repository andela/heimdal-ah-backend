import chai from 'chai';
// import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

import {
  userDataWithEmptyEmail,
  userDataWithEmptyUserName,
  userDataWithEmptyFields,
  userDataWithEmptyPassword,
  userDataWithInvalidEmail,
  userDataWithInvalidFields,
  userDataWithInvalidUserName,
  userDataWithInvalidPassword,
  userDataWithInvalidPasswordAndEmail,
  userDataWithLongUserName,
  userDataWithShortPassword,
  userDataWithInvalidDataTypes,
  userDataWithAnExistingEmail,
  userDataWithWhiteSpacedPassword,
} from '../../mockdata/userMockData';

chai.use(chaiHttp);
chai.should();

const userSignupUrl = '/api/v1/users/signup';

describe('User signup validation (middleware) unit tests', () => {
  it('should return an error if the user enters empty username', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyUserName)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            userName: [
              'Invalid User name',
              'please enter a Username, it can not be empty'
            ]
          }
        });
        done();
      });
  });
  it('should return an error if the user enters invalid name (have whitespaces or spaces)', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidUserName)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            userName: [
              'Invalid User name',
              'please enter a valid username, it cannot be separated with space'
            ]
          }
        });
        done();
      });
  });
  it('should return error if user enters a name that is too long', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithLongUserName)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            userName: [
              'Username is too long'
            ]
          }
        });
        done();
      });
  });
  it('should return an error if the user enters an invalid password', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidPassword)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            password: [
              'password must contain a letter and number'
            ]
          }
        });
        done();
      });
  });
  it(
    'should return error if user enters a password length less than 8',
    (done) => {
      chai.request(app)
        .post(userSignupUrl)
        .send(userDataWithShortPassword)
        .end((err, res) => {
          res.body.should.be.eql({
            errors: {
              password: [
                'password must be at least 8 characters'
              ]
            }
          });
          done();
        });
    }
  );
  it('should return error if user doesnt enter password', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyPassword)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            password: [
              'password must be at least 8 characters',
              'password must contain a letter and number'
            ]
          }
        });
        done();
      });
  });
  it('should return error if user enters invalid email', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidEmail)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            email: [
              'please enter a valid email'
            ]
          }
        });
        done();
      });
  });
  it('should return error if user fails to enter email', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyEmail)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            email: [
              'please enter a valid email'
            ]
          }
        });
        done();
      });
  });
  it('should return error if user enters invalid name and password', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidPasswordAndEmail)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            email: [
              'please enter a valid email',
            ],
            password: [
              'password must contain a letter and number'
            ]
          }
        });
        done();
      });
  });
  it('should return error if user enters invalid fields', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidFields)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            userName: [
              'Invalid Username',
              'please enter a valid Username',
            ],
            email: [
              'please enter a valid email',
            ],
            password: [
              'password must contain a letter and number',
            ]
          }
        });
        done();
      });
  });
  it('should return an error if the user fails to fill any field', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithEmptyFields)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            fullName: [
              'Invalid username',
              'please enter a username',
            ],
            email: [
              'please enter a valid email',
            ],
            password: [
              'password must be at least 8 characters',
              'password must contain a letter and number',
            ]
          }
        });
        done();
      });
  });
  it('should return error if any field is not of type string', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithInvalidDataTypes)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            fullName: [
              'Invalid full name',
              'please enter first name and last name separated by space',
            ],
            email: [
              'please enter a valid email',
            ],
            password: [
              'password must be at least 8 characters',
              'password must contain a letter and number',
            ]
          }
        });
        done();
      });
  });
  it('should return error if password contains white space', (done) => {
    chai.request(app)
      .post(userSignupUrl)
      .send(userDataWithWhiteSpacedPassword)
      .end((err, res) => {
        res.body.should.be.eql({
          errors: {
            password: ['password must not contain space']
          }
        });
        done();
      });
  });
  it('should return error if user enters an existing email',
    (done) => {
      chai.request(app)
        .post(userSignupUrl)
        .send(userDataWithAnExistingEmail)
        .end((err, res) => {
          res.body.should.be.eql({
            errors: {
              email: [
                'email is already in use',
              ]
            }
          });
          done();
        });
    });
});


// References
// Got help and inspiration from previous Andela Sims Project.
