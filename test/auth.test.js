/* eslint-disable import/order */
/* eslint-disable consistent-return */
const { expect } = require("chai")
const request = require("supertest")
const http = require("../server")
const userModel = require("../models/userModel")

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
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
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

  it("should return a 400 status code when registering with an existing email", (done) => {
    const user = {
      firstname: "Johnny",
      lastname: "Doe",
      username: "marydoe",
      email: "janedoe@example.com", // Existing email, assuming it already exists in the database
      password: "testpassword",
      gender: "male",
    }

    request(http)
      .post("/api/auth/register")
      .send(user)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "This email already exist. Try with new email.")
        done()
      })
  }).timeout(5000)

  it("should return an error if the password length is less than 8 characters", (done) => {
    request(http)
      .post("/api/auth/register")
      .send({
        firstname: "Mary",
        lastname: "Doe",
        username: "mary",
        email: "marydoe1.example.com",
        password: "short", // Password is less than 8 characters
        gender: "female",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Your password must be atleast 8 characters.")
        done()
      })
  })

  it("should return an error if an error occurs during user registration", (done) => {
    userModel.findOne = async () => {
      throw new Error("Database error")
    }

    request(http)
      .post("/api/auth/register")
      .send({
        firstname: "Marry",
        lastname: "Doe",
        username: "marrydoe",
        email: "marry@example.com",
        password: "securepassword",
        gender: "female",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to register the user. Database error")
        done()
      })
  })
})

describe("POST /api/auth/login", () => {
  it("should login a user with correct credentials", (done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        username: "johndoe",
        password: "correctpassword",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).to.equal("User logged in successfully.")
        done()
      })
  })

  it("should return an error if the username does not exist", (done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        username: "nonexistentuser",
        password: "securepassword",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).to.equal("Username does not exist. Use correct username.")
        done()
      })
  })

  it("should return an error if the password does not match", (done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        username: "johndoe",
        password: "incorrectpassword",
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body.message).to.equal("Password does not match. Please try again.")
        done()
      })
  })

  it("should return an error if an error occurs during user login", (done) => {
    userModel.findOne = async () => {
      throw new Error("Database error")
    }

    request(http)
      .post("/api/auth/login")
      .send({
        username: "marrydoe",
        password: "securepassword",
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to log in the user. Database error")
        done()
      })
  })
})

describe("POST /api/auth/logout", () => {
  it("should clear the refresh token cookie and return a successful message", (done) => {
    request(http)
      .post("/api/auth/logout")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "User logged out successfully.")
        done()
      })
  })

  it("should return 500 error if an error occurs during logout", (done) => {
    request(http)
      .post("/api/auth/logout")
      .set("Cookie", "refresh_token = test_token; Path = /invalid_path")
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to logout the user.")
        done()
      })
  })
})