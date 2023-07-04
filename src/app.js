const express = require("express");
const app = express();
require("dotenv").config();
PORT = process.env.PORT;
const routes = require("express").Router();
const { signup, signin } = require("./controllers/authController");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

//Connect to database
async function conndb() {
  try {
    const conn = await mongoose.connect(process.env.CONNECTIONSTRING);

    console.log("db connected if value is one ->");
  } catch (err) {}
}

conndb();
// try {
// mongoose.connect(process.env.CONNECTIONSTRING, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// });
//   });
//   console.log("connected to db");
// } catch (error) {
//   handleError(error);
// }

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
app.use(routes);
app.get("/", (req, res) => {
  res.send("hello ");
});

//app.post("/register", registerRoute);

routes.post("/register", signup);

routes.post("/signin", signin);

app.listen(PORT, (error) => {
  if (!error) console.log("Server is Successfully Running and App is listening on port " + PORT);
  else console.log("Error occurred, server can't start", error);
});
