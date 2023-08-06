// /* eslint-disable no-unused-expressions */
// /* eslint-disable import/no-extraneous-dependencies */
// // register-test.js
// const mongoose = require("mongoose")
// const chai = require("chai")
// const chaiHttp = require("chai-http")
// const usermodel = require("../models/userModel")

// const { expect } = chai
// const app = require("../server")

// chai.use(chaiHttp)
// describe("Authentication of user", () => {
//   beforeEach(async () => {
//     await usermodel.deleteMany({}, (error) => {
//     })
//   })
//   describe("POST user", () => {
//     it("to register a new user", (done) => {
//       const user = {
//         firstname: "John",
//         lastname: "Doe",
//         username: "johndoe",
//         email: "john@example.com",
//         password: "securepassword",
//         gender: "male",
//       }

//       chai.request(app)
//         .post("/register")
//         .send(user)
//         .end((error, res) => {
//           expect(res.body.user).to.have.property("firstname")
//           expect(res.body.user).to.have.property("lastname")
//           expect(res.body.user).to.have.property("username")
//           expect(res.body.user).to.have.property("email")
//           expect(res.body.user).to.have.property("password")
//           expect(res.body.user).to.have.property("gender")
//           expect(res).to.have.status(200)
//           expect(res.body).to.have.property("user").to.be.an("object")
//           expect(res.body.message).to.equal("User registered successfully.")
//           expect(res.body.access_token).to.be.a("string")
//           expect(res.body.user).to.be.an("object")
//           expect(res.body).to.have.property("message", "User registered successfully.")
//           expect(res.body).to.have.property("access_token").to.be.a("string")

//           done()
//         })
//     })
//   })
// })

const request = require("supertest")
const chai = require("chai")
// const chaiHttp = require("chai-http")
// eslint-disable-next-line linebreak-style
const app = require("../server") // Assuming the server.js file is in the parent directory
const usermodel = require("../models/userModel")

const { expect } = chai

let api
let accesstoken
describe("Authentication", () => {
  before("Initializing API in before block", (done) => {
    app.then((result) => {
      api = request(result)
      done()
    })
      .catch(done)
  })

  it("Post register a user", (done) => {
    api.post("/api/auth/register")
      .field("firstname", "John")
      .field("lastname", "Doe")
      .field("username", "johndoe")
      .field("email", "john@example.com")
      .field("password", "securepassword")
      .field("gender", "male")
      .then((response) => {
        // accesstoken = response.body.data.access_token

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property("data")
        expect(response.body).to.have.property("error", null)
        // expect(response.body.data).to.have.property("access_token")
        expect(response.body).to.have.property("message", "User registered successfully.")

        done()
      })
      .catch((error) => done(error))
  })
})