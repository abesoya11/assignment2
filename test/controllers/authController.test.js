process.env.NODE_ENV = "test";
const chai = require("chai");
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const server = require("../../src/app");
const expect = require("chai").expect;
var bcrypt = require("bcrypt");
var User = require("../../src/models/user");
const { signUp, signIn } = require("../../src/controllers/authController");
const user = require("../../src/models/user");

describe("testing auth Controller file", () => {
  let signUpBody = {
    fullName: "test",
    email: "fdsa@fdsa.com",
    password: "1234",
  };
  it("testing Signup success ", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("User Registered successfully");
      });
    done();
  });

  it("testing signup missing field", (done) => {
    delete signUpBody.fullName;
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        expect(res.status).equal(500);
        expect(res.body.message.message).equal("User validation failed: fullName: fullname not provided ");
      });

    done();
  });
});

describe("DESCRIBE 2 testing sign in flow", () => {
  let signInBody = {
    email: "fdsa@fdsa.com",
    password: "1234",
  };
  beforeEach((done) => {
    console.log("BEFORE EACH OF Describe 2 testing signi in flow  ");
    const user = new User({
      fullName: "test",
      email: "fdsa@fdsa.com",
      password: bcrypt.hashSync("1234", 8),
    });
    user
      .save()
      .then(() => {
        console.log("==============RUNNING THEN BLOCK++++++++++++++++++++++++++++++");
        done();
      })
      .catch((err) => {
        console.log("++++++++++++++RUNNING CATCH BLOCK+++++++++++++++++++--------------");
        done();
      });
  });

  it("testing signIn", (done) => {
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        console.log("status is (exp- 200) + " + res.status);
        expect(res.status).equal(200);
        expect(res.body).to.have.property("accessToken");
        expect(res.body.message).equal("Login successful");

        done();
        // expect(res.body.message.message).equal("User validation failed: fullName: fullname not provided ");
      });
  });

  it("TESTING user not found ", (done) => {
    signInBody.email = "fdsa@rew.com";
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        console.log("status is  (exp- 404) + " + res.status);
        expect(res.status).equal(404);
        // expect(res.body.message.message).equal("User validation failed: fullName: fullname not provided ");
        done();
      });
  });

  it("TESTING wrong password ", (done) => {
    signInBody.email = "fdsa@fdsa.com";
    signInBody.password = "ffdsa";
    chai
      .request(server)
      .post("/signin")
      .send(signInBody)
      .end((err, res) => {
        console.log("status is  (exp- 401) + " + res.status);
        expect(res.status).equal(401);
        expect(res.body.accessToken).to.be.null;
        // expect(res.body.message.message).equal("User validation failed: fullName: fullname not provided ");
        done();
      });
  });
});
