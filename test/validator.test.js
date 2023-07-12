const expect = require("chai").expect;
const Validator = require("../src/helpers/validator");

describe("testing validator file", () => {
  it("all fields present", (done) => {
    data = {
      fullName: "test",
      email: "abe@gmail.com",
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
    console.log("------------============--------------");

    expect(result).equal(false);
    done();
  });
});
