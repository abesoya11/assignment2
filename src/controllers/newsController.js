const axios = require("axios");
require("dotenv").config();

var getNews = (req, res) => {
  console.log("hello");
  console.log("logging form get news functin");
 
};

function sendAxiosReq(query){
    axios
    .get("https://newsapi.org/v2/everything", {
      params: {
        q: "apple",
        from: "2023-07-03",
        apiKey: process.env.API_KEY_NEWSAPI,
      },
    })
    .then(function (response) {
      // console.log(response);

      console.log("running then of axios");
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function (error) {
      console.log("running catch of axios");
      console.log(error);
    })
    .finally(function () {
      // always executed
    });


}

module.exports = getNews;
