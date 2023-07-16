const expect = require("chai").expect;
const User = require("../src/models/user");
const bcrypt = require("bcrypt");

describe("testing registration of user", () => {
  it("registering user successfully", (done) => {
    const user = new User({
      fullName: "test user",
      email: "ab@cd.com",
      password: bcrypt.hashSync("password", 6),
    });
    expect(user.isNew).equal(true);
    user
      .save()
      .then(() => {
        console.log("running then user save");
        expect(user.isNew).equal(false);
        done();
      })
      .catch((err) => {
        console.log("running catch of user save");
        console.log(err);
        done();
      });
  });

  it("registering user not successfully", (done) => {
    const user = new User({
      fullName: "test user",
      email: "ab@cd.com",
    });
    expect(user.isNew).equal(true);
    user
      .save()
      .then(() => {
        console.log("running then user save");
        expect(user.isNew).equal(false);
        done();
      })
      .catch((err) => {
        console.log("running catch of user save");
        //console.log(err);
        expect(user.isNew).equal(true);

        expect(err._message).equal("User validation failed");

        done();
      });
  });

  it("unsuccessful registration - missing fullName", (done) => {
    const user = new User({
      password: "test user",
      email: "ab@cd.com",
    });
    expect(user.isNew).equal(true);
    user
      .save()
      .then(() => {
        console.log("running then user save");
        expect(user.isNew).equal(false);
        done();
      })
      .catch((err) => {
        console.log("running catch of user save");
        //console.log(err);
        expect(user.isNew).equal(true);

        expect(err._message).equal("User validation failed");

        done();
      });
  });
});
