/* eslint-disable import/no-extraneous-dependencies */
// register-test.js
const chai = require("chai")

const { expect } = chai
const supertest = require("supertest")
const app = require("../server")
// Replace this with the path to your Express app file
const request = supertest(app)

describe("User Registration End-to-End Test", () => {
  let page


  // Test case: User Registration
  it("should allow a user to register", async () => {
    // Replace these with the test data you want to use for registration
    const userData = {
      firstname: "John",
      lastname: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      password: "securepassword",
      gender: "male",
    }

    // Simulate user registration using Puppeteer
    await page.goto("http://localhost:5000/auth/register") // Replace with your registration page URL
    await page.type("#firstname", userData.firstname)
    await page.type("#lastname", userData.lastname)
    await page.type("#username", userData.username)
    await page.type("#email", userData.email)
    await page.type("#password", userData.password)
    await page.select("#gender", userData.gender)
    await page.click("#register-button")
    await page.waitForNavigation()

    // Make a request to check if the user was registered successfully
    const response = await request.post("/api/auth/register").send(userData)

    // Assertions
    expect(response.status).to.equal(200)
    expect(response.body.message).to.equal("User registered successfully.")
    expect(response.body.newUser.firstname).to.equal(userData.firstname)
    expect(response.body.newUser.lastname).to.equal(userData.lastname)
    expect(response.body.newUser.username).to.equal(userData.username)
    expect(response.body.newUser.email).to.equal(userData.email)
  })

  // Add more test cases for different scenarios as needed
})