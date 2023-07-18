const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('User API', () => {
  describe('GET /api/user/:id', () => {
    it('should return a user by ID', (done) => {
      const userId = '64b535bdc2e48317fc376fc9'; 

      chai.request(server)
        .get(`/api/user/${userId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          done();
        });
    });

    it('should return an error if user ID does not exist', (done) => {
      const userId = 'nonexistent';

      chai.request(server)
        .get(`/api/user/${userId}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('msg');
          done();
        });
    });
  });
});
