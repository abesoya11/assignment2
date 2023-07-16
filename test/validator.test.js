const expect = require("chai").expect;
const Validator = require("../src/helpers/validator");

describe("testing validator file", () => {
  it("all fields present", (done) => {
    data = {
      fullName: "test",
      email: "abe@gmail.com",
      role: "admin",
      password: "1234",
    };

    let result = Validator.allFieldsPresentForRegisteration(data);
    console.log("------------============--------------");
    console.log("hello" + result);
    expect(result).equal(true);
    done();
  });

  it("missing one of the fields", (done) => {
    delete data.password;
    let result = Validator.allFieldsPresentForRegisteration(data);
    console.log("------------============------------,,p--");

    expect(result).equal(false);
    done();
  });

  it("validate email test", (done) => {
    data.password = "1234";
    let result = Validator.validateEmail(data.email);
    console.log("------------============------------,,p--");

    expect(result).equal(true);
    done();
  });

  it("validate email test gone wrong", (done) => {
    data.email = "a@@fhdksa@gmailm";
    let result = Validator.validateEmail(data.email);
    console.log("------------============------------,,p--");

    expect(result).equal(false);
    done();
  });

  it("validate Role passed as admin only admin n user allowed", (done) => {
    let result = Validator.validateRole(data.role);
    console.log("------------============------------,,p--");

    expect(result).equal(true);
    done();
  });

  it("validate Role passed as wrong value only admin n user allowed", (done) => {
    data.role = "user2";
    let result = Validator.validateRole(data.role);
    console.log("------------============------------,,p--");

    expect(result).equal(false);
    done();
  });
});
