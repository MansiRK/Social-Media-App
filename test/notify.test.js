const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); 

chai.use(chaiHttp);
const expect = chai.expect;


let notificationId;

describe('Notification', () => {

  let accessToken;


  before((done) => {
    chai
      .request(server)
      .post('/api/login')
      .send({ email:'abc@gmail.com', password: '$2b$12$Kvx3kBL96PeifVFKWk040O8k8aheUVdzqQpd5xELPQJIfvLrYQ5vu' })
      .end((err, res) => {
        accessToken = res.body.access_token;
        done();
      });
  });

  describe('POST /api/notify', () => {
    it('should create a new notification', (done) => {
      chai
        .request(server)
        .post('/api/notify')
        .set('Authorization', 'Bearer ' + accessToken)
        .send({
          id: 'notification_id_here',
          recipients: ['user_id_1', 'user_id_2'],
          url: '/notification-url',
          text: 'New notification',
          content: 'Notification content',
          image: 'notification_image_url'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          notificationId = res.body.notify._id;

          done();
        });
    });
  });

  describe('DELETE /api/notify/:id', () => {
    it('should remove a notification', (done) => {
      chai
        .request(server)
        .delete(`/api/notify/${notificationId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          done();
        });
    });
  });

  describe('GET /api/notifies', () => {
    it('should get all notifications for a user', (done) => {
      chai
        .request(server)
        .get('/api/notifies')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          done();
        });
    });
  });

  describe('PATCH /api/isReadNotify/:id', () => {
    it('should mark a notification as read', (done) => {
      chai
        .request(server)
        .patch(`/api/isReadNotify/${notificationId}`)
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          done();
        });
    });
  });

  describe('DELETE /api/deleteAllNotify', () => {
    it('should delete all notifications for a user', (done) => {
      chai
        .request(server)
        .delete('/api/deleteAllNotify')
        .set('Authorization', 'Bearer ' + accessToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          // Additional assertions for the deleted notifications

          done();
        });
    });
  });

  // Additional test cases for different scenarios and edge cases
});
