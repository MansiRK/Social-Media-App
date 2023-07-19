const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Assuming the server.js file is in the parent directory

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication', () => {
  describe('POST /api/register', () => {
    it('should register a new user', (done) => {
      chai
        .request(server)
        .post('/api/register')
        .send({
          firstname: 'John',
          lastname: 'Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          password: 'password',
          gender: 'male'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.msg).to.equal('Register Success!');
          expect(res.body.access_token).to.be.a('string');
          expect(res.body.user).to.be.an('object');
          done();
        });
        
    });
  });

  describe('POST /api/login', () => {
    it('should log in an existing user', (done) => {
      chai
        .request(server)
        .post('/api/login')
        .send({
          email: 'johndoe@example.com',
          password: 'password'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.msg).to.equal('Login Success!');
          expect(res.body.access_token).to.be.a('string');
          expect(res.body.user).to.be.an('object');


          done();
        });
    });
  });

  describe('POST /api/logout', () => {
    it('should log out a user', (done) => {
      chai
        .request(server)
        .post('/api/logout')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.msg).to.equal('Logged out!');

          done();
        });
    });
  });
});
