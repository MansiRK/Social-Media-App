/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
const { expect } = require("chai")
const request = require("supertest")
const cloudinary = require("cloudinary").v2
const http = require("../server")
const postModel = require("../models/postModel")
const userModel = require("../models/userModel")

describe("POST /api/post/", () => {
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

  it("should create a new post", (done) => {
    const images = ["imageURL"]
    const caption = "Test caption"

    cloudinary.uploader.upload = async () => ({
      public_id: "test_public_id",
      secure_url: "test_secure_url",
    })
    request(http)
      .post("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        images,
        caption,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err)
          return done(err)
        }
        console.log(res.body)
        expect(res.body).to.be.an("object")
        expect(res.body).to.have.property("message", "You successfully created a post.")
        done()
      })
  })

  it("should return an error if no images are provided", (done) => {
    const caption = "Test caption"

    request(http)
      .post("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        caption,
        images: [],
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Image is compulsory to create a post.")
        done()
      })
  })

  it("should return a 500 error if an error occurs during the search process", (done) => {
    const images = ["imageURL"]
    const caption = "Test caption"

    cloudinary.uploader.upload = async () => ({
      public_id: "test_public_id",
      secure_url: "test_secure_url",
    })

    postModel.uploader.save = async () => {
      throw new Error("Database error")
    }

    request(http)
      .post("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        caption,
        images,
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to create a post.")
        done()
      })
  })
})

describe("GET /api/post/", () => {
  let accessToken
  let user

  before((done) => {
    request(http)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "securepassword",
      })
      .end(async (err, res) => {
        accessToken = res.body.access_token
        user = await userModel.findOne({ email: "test@example.com" })
        done()
      })
  })

  it("should fetch all posts of the user and the users they are following", (done) => {
    const post1 = new postModel({
      caption: "Post 1 caption",
      images: [{
        public_id: "public_id_1",
        secure_url: "secure_url_1",
      }],
      user: "64c8bfd24d2d914fb9ea56a2",
    })
    const post2 = new postModel({
      caption: "Post 2 caption",
      images: [{
        public_id: "public_id_2",
        secure_url: "secure_url_2",
      }],
      user: user.following[0],
    })

    post1.save()
    post2.save()

    request(http)
      .get("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "All posts fetched successfully.")
        expect(res.body.posts).to.be.an("array").with.lengthOf(2)
        done()
      })
  })

  it("should return a 400 error if no posts are found", (done) => {
    postModel.find = async () => []

    request(http)
      .get("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "There are no posts.")
        done()
      })
  })

  it("should return a 500 error if an error occurs during the fetching process", (done) => {
    postModel.find = async () => {
      throw new Error("Database error")
    }

    request(http)
      .get("/api/post")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).to.have.property("message", "Failed to fetch the posts.")
        done()
      })
  })
})