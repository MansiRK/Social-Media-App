/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
// register-test.js
const chai = require("chai")

const { expect } = chai
const chaiHttp = require("chai-http")
const app = require("../server")

chai.use(chaiHttp)
describe("Authentication of user", () => {
  describe("Post/api/auth", () => {
    it("should register a new user", (done) => {
      const user = {
        firstname: "John",
        lastname: "Doe",
        username: "johndoe",
        email: "john@example.com",
        password: "securepassword",
        gender: "male",
      }

      chai.request(app)
        .post("/register")
        .send(user)
        .end((error, res) => {
          expect(res.body.user).should.have.property("firstname")
          expect(res.body.user).should.have.property("lastname")
          expect(res.body.user).should.have.property("username")
          expect(res.body.user).should.have.property("email")
          expect(res.body.user).should.have.property("password")
          expect(res.body.user).should.have.property("gender")
          expect(res).to.have.status(200)
          expect(res.body).to.be.an("object")
          expect(res.body.message).to.equal("User registered successfully.")
          expect(res.body.access_token).to.be.a("string")
          expect(res.body.user).to.be.an("object")
          done()
        })
    })
  })
})