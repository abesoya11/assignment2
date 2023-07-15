const mongoose = require("mongoose");
require("dotenv").config();

before((done) => {
  mongoose
    .connect("mongodb+srv://abesoya11:mongomongomongoadityaadityaaditya@cluster0.xm76alp.mongodb.net/airtribe-testdb?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("connected to test db");
      done();
    })
    .catch(() => {
      console.log("ss");
      done();
    });
});

beforeEach((done) => {
  console.log("GLOBAL running before each test --------------");
  if (mongoose.connection.collections.users) {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  } else done();
});

afterEach((done) => {
  console.log("GLOBAL running AFTER each test --------------");
  if (mongoose.connection.collections.users) {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  } else done();
});

// before((done) => {
//   mongoose
//     .connect(process.env.CONNECTIONSTRING)
//     .then(() => {
//       console.log("Test db connected");
//       done();
//     })
//     .catch((err) => {
//       console.log("db error");
//       console.log(err);
//       done();
//     });
// });
