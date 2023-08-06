/* eslint-disable consistent-return */
const { expect } = require("chai")
const request = require("supertest")
const http = require("../server") // Replace with the path to your Express app (where the 'register' function is defined)

describe("POST /api/auth/register", () => {
  it("should register a new user and return a 200 status code", (done) => {
    const user = {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "testpassword",
      gender: "male",
    }

    request(http)
      .post("/api/auth/register")
      .send(user)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.status(200)
        expect(res.body).to.have.property("message", "User registered successfully.")
        expect(res.body).to.have.property("access_token")
        expect(res.body).to.have.property("newUser")
        expect(res.body.newUser).to.have.property("firstname", user.firstname)
        expect(res.body.newUser).to.have.property("lastname", user.lastname)
        expect(res.body.newUser).to.have.property("username", user.username)
        expect(res.body.newUser).to.have.property("email", user.email)
        expect(res.body.newUser).to.have.property("password", user.password)
        expect(res.body.newUser).to.have.property("gender", user.gender)
        done()
      })
  }).timeout(10000)

  it("should return a 400 status code when registering with an existing username", (done) => {
    const user = {
      firstname: "Jane",
      lastname: "Doe",
      username: "johndoe", // Existing username, assuming it already exists in the database
      email: "janedoe@example.com",
      password: "testpassword",
      gender: "female",
    }

    request(http)
      .post("/api/auth/register")
      .send(user)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "This username already exist. Try with new username.")
        done()
      })
  }).timeout(5000)

  // Add more test cases to cover other scenarios such as existing email, invalid password, etc.
})