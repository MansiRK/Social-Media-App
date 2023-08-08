/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable arrow-body-style */
const { expect } = require("chai")
const request = require("supertest")
const http = require("../server")
const userModel = require("../models/userModel")

describe("GET /api/user/search/:username", () => {
  const testUsers = [
    {
      username: "johndoe",
      firstname: "John",
      lastname: "Doe",
    },
  ]
  let accessToken

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end((err, res) => {
        accessToken = res.body.access_token
        done()
      })
  })

  userModel.find = async (query) => {
    return testUsers.filter((user) => user.username.includes(query.username.$regex))
  }

  it("should return users with matching usernames", (done) => {
    const searchUsername = "johndoe" //

    request(http)
      .get(`/api/user/search/${searchUsername}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err)
          return done(err)
        }
        console.log(res.body)
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("message", "User searched successfully.")
        expect(res.body.user).to.deep.equal("testUsers")
        expect(res.body.testUsers).to.have.lengthOf(1)
        done()
      })
  })

  it("should return an error if the user doesn't exist during the search process", (done) => {
    const searchUsername = "jane"

    request(http)
      .get(`/api/user/search/${searchUsername}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "No user found with this username.")
        done()
      })
  })

  it("should return a 500 error if an error occurs during the search process", (done) => {
    userModel.find = async () => {
      throw new Error("Database error")
    }

    const searchUsername = "john"

    request(http)
      .get(`/api/user/search/${searchUsername}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to search user.")
        done()
      })
  })
})

describe("GET /api/user/:id", () => {
  const user = {
    _id: "64c8bfd24d2d914fb9ea56a2",
    username: "kartiki",
    firstname: "Kartiki",
    lastname: "Inamdar",
  }

  let accessToken

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end((err, res) => {
        accessToken = res.body.access_token
        done()
      })
  })

  userModel.findById = async () => {
    return user
  }

  it("should return a user and success message", (done) => {
    const userId = "64c8bfd24d2d914fb9ea56a2" // User id that exists

    request(http)
      .get(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .send(user)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "User fetched successfully.")
        expect(res.body.user).to.deep.equal("user")
      })
  })

  it("should return error when a user doesn't exist", (done) => {
    const userId = "64c8bfd24d2d914fb9ea56a3" // User id that doesn't exist

    request(http)
      .get(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(user)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "User does not exists.")
      })
  })

  it("should return a 500 error if an error occurs during the fetching process", (done) => {
    userModel.find = async () => {
      throw new Error("Database error")
    }

    const userId = "64c8bfd24d2d914fb9ea56a2"

    request(http)
      .get(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to fetch user.")
        done()
      })
  })
})

describe("PATCH /api/user/:id", (done) => {
  const updateUser = {
    firstname: "Updated firstname",
    lastname: "Update lastname",
  }

  let accessToken

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end((err, res) => {
        accessToken = res.body.access_token
        done()
      })
  })

  it("should return a updated user and success message", (done) => {
    const userId = "64c8bfd24d2d914fb9ea56a2" // User id that exists

    request(http)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .send(updateUser)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "User updated successfully.")
        expect(res.body).to.be.an("object")
        expect(res.body.user).to.have.property("userId", "1234")
        expect(res.body.user).to.have.property("firstname", "Updated firstname")
        expect(res.body.user).to.have.property("lastname", "Updated lastname")
        done()
      })
  })

  it("should return an error message when user doesn't exist", (done) => {
    const userId = "64c8bfd24d2d914fb9ea56a3" // User id that doesn't exist

    request(http)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updateUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "No user exist with this ID.")
      })
  })

  it("should return a 500 error if an error occurs during the fetching process", (done) => {
    userModel.find = async () => {
      throw new Error("Database error")
    }

    const userId = "64c8bfd24d2d914fb9ea56a2"

    request(http)
      .patch(`/api/user/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to update user.")
        done()
      })
  })
})

describe("PATCH /api/user/follow/:id", (done) => {
  let accessToken
  let userId

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end((err, res) => {
        accessToken = res.body.access_token
        userId = "64c8bfd24d2d914fb9ea56a2"
        done()
      })
  })

  it("should follow a user", (done) => {
    userModel.find = async () => []

    userModel.findOneAndUpdate = async () => ({
      _id: userId,
      followers: [userId],
      followings: [],
    })

    request(http)
      .patch(`/api/user/follow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "You successfully followed this user.")
        expect(res.body).to.be.an("object")
        done()
      })
  })

  it("should return an error message if already following the user", (done) => {
    userModel.find = async () => [{
      _id: userId,
    }]

    userModel.findOneAndUpdate = async () => ({
      _id: userId,
      followers: [userId],
      followings: [],
    })
    request(http)
      .patch(`/api/user/follow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "You are already following this user.")
      })
  })

  it("should return a 500 error if an error occurs during the process", (done) => {
    userModel.find = async () => {
      throw new Error("Database error")
    }

    userModel.findOneAndUpdate = async () => {
      throw new Error("Database error")
    }

    request(http)
      .patch(`/api/user/follow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to follow this user.")
        done()
      })
  })
})

describe("PATCH /api/user/unfollow/:id", (done) => {
  let accessToken
  let userId

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end((err, res) => {
        accessToken = res.body.access_token
        userId = "64c8bfd24d2d914fb9ea56a2"
        done()
      })
  })

  it("should unfollow a user", (done) => {
    userModel.find = async () => [{
      _id: userId,
    }]

    userModel.findOneAndUpdate = async () => ({
      _id: userId,
      followers: [],
      followings: [],
    })

    request(http)
      .patch(`/api/user/unfollow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "You successfully unfollowed this user.")
        expect(res.body).to.be.an("object")
        done()
      })
  })

  it("should return an error message if already not following the user", (done) => {
    userModel.find = async () => []

    userModel.findOneAndUpdate = async () => ({
      _id: userId,
      followers: [],
      followings: [],
    })
    request(http)
      .patch(`/api/user/unfollow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "You are already not following this user.")
      })
  })

  it("should return a 500 error if an error occurs during the process", (done) => {
    userModel.find = async () => {
      throw new Error("Database error")
    }

    userModel.findOneAndUpdate = async () => {
      throw new Error("Database error")
    }

    request(http)
      .patch(`/api/user/unfollow/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to unfollow this user.")
        done()
      })
  })
})