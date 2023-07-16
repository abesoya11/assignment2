const { getPreference, putPreference } = require("../../src/controllers/preferenceController");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const server = require("../../src/app");

describe("D Testing preference controller GET", () => {
  let jwtToken;
  beforeEach((done) => {
    let signUpBody = {
      fullName: "test",
      email: "asdf@adf.com",
      password: "1234",
    };
    chai
      .request(server)
      .post("/register")
      .send(signUpBody)
      .end((err, res) => {
        console.log("======registering in before each " + res.body.message);
        let signInBody = {
          email: "asdf@adf.com",
          password: "1234",
        };
        chai
          .request(server)
          .post("/signin")
          .send(signInBody)
          .end((err, res) => {
            jwtToken = res.body.accessToken;

            console.log("========= jwt token " + jwtToken);
            done();
          });
      });
  });

  it("IT- get preference OK", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("authorization", `JWT ${jwtToken}`)
      .end((err, res) => {
        console.log("logging result of get preferecen");
        console.log(res.body);
        expect(res.status).equal(200);
        done();
      });
  });
});

describe("D - testing wrong flows ", () => {
  before;
  it("IT-- user not valid due to wrong jwt token", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("authorization", `JWT $ ffda`)
      .end((err, res) => {
        console.log("logging result of get preferecen");
        console.log(res.body);
        expect(res.status).equal(400);
        expect(res.body.message).equal("invalid user");
        done();
      });
  });

  it("IT-- header not set - not jwt passed", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .end((err, res) => {
        console.log("logging result of get preferecen");
        console.log(res.body);
        expect(res.status).equal(400);
        expect(res.body.message).equal("Authorization header not found");
        done();
      });
  });
});
