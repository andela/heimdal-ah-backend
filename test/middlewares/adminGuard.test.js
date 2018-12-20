/* eslint-disable no-underscore-dangle */
import chai from 'chai';
import chaiHttp from 'chai-http';
import httpMocks from 'node-mocks-http';
import adminGuard from '../../middlewares/adminGuard';

chai.use(chaiHttp);
chai.should();

describe('Comment History Tests', () => {
  const user = httpMocks.createRequest({
    app: {
      locals: {
        user: {
          roleId: 2
        }
      }
    }
  });

  describe('GET /api/v1/admin/users/', () => {
    let res;
    beforeEach(() => {
      res = httpMocks.createResponse();
    });

    it('should return status code 401 if user is not an admin', () => {
      adminGuard(user, res);
      const data = JSON.parse(res._getData());
      res.statusCode.should.equal(401);
      data.message.should.be.equal('Unauthorized');
    });
  });
});
