var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var User = require("../models/user");
const bodyParser = require("body-parser");
const path = require("path");
var data = require("../data.json");

const fs = require("fs");

var signup = (req, res) => {
  console.log("logging from signup");

  const user = new User({
    fullName: req.body.fullName,
    email: req.body.email,

    password: bcrypt.hashSync(req.body.password, 8),
  });

  console.log("registrering user");
  user
    .save()
    .then((data) => {
      console.log("thenof user.save" + data);
      res.status(200).send({
        message: "User Registered successfully",
      });
    })
    .catch((err) => {
      // console.log("eror is --");
      // console.log(err);
      res.status(500).send({
        message: err,
      });
      console.log("error hello ");
      console.log(err);
      return;
    });
};

var signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        return res.status(404).send({
          message: "User Not found.",
        });
      }
      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      //signing token with user id
      var token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      //responding to client request with user profile success message and  access token .
      res.status(200).send({
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
        },
        message: "Login successful",
        accessToken: token,
      });
    })
    .catch((err) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      }
    });
};

module.exports = { signin, signup };
