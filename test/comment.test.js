const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.use(chaiHttp)
const { expect } = chai

let commentId

describe('Comment', () => {
  let accessToken

  before((done) => {
    chai
      .request(server)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password' })
      .end((err, res) => {
        accessToken = res.body.access_token
        done()
      })
  })

  describe('POST /api/comment', () => {
    it('should create a new comment', (done) => {
      chai
        .request(server)
        .post('/api/comment')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          postId: '64b538f8c2e48317fc37702e',
          content: 'Hello',
          postUserId: '64b537f2c2e48317fc377015',
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')

          // eslint-disable-next-line no-underscore-dangle
          commentId = res.body.newComment._id

          done()
        })
    })
  })

  describe('PATCH /api/comment/:id', () => {
    it('should update a comment', (done) => {
      chai
        .request(server)
        .patch(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          content: 'Updated comment',
        })
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.msg).to.equal('Update Success!')

          done()
        })
    })
  })

  describe('PATCH /api/comment/:id/like', () => {
    it('should like a comment', (done) => {
      chai
        .request(server)
        .patch(`/api/comment/${commentId}/like`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.msg).to.equal('Liked Comment!')

          done()
        })
    })
  })

  describe('PATCH /api/comment/:id/unlike', () => {
    it('should unlike a comment', (done) => {
      chai
        .request(server)
        .patch(`/api/comment/${commentId}/unlike`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.msg).to.equal('UnLiked Comment!')

          done()
        })
    })
  })

  describe('DELETE /api/comment/:id', () => {
    it('should delete a comment', (done) => {
      chai
        .request(server)
        .delete(`/api/comment/${commentId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body.msg).to.equal('Deleted Comment!')

          done()
        })
    })
  })
})
