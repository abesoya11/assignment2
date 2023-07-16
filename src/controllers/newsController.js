const axios = require("axios");
const send = require("send");
require("dotenv").config();

var getNews = async (req, res) => {
  console.log("hello");
  console.log("logging form get news functin");
  var newsResult = [];

  let preferenceArray = req.user.preference;

  // preferenceArray.map(async (element) => {
  //   let result = await sendAxiosReq("cricket");
  //   newsResult.push(result.data);
  //   console.log(newsResult.length);
  // });
  try {
    //let result = await sendMultipleRequests(preferenceArray);
    for (let i = 0; i < preferenceArray.length; i++) {
      let result3 = await sendAxiosReq(preferenceArray[i]);
      newsResult = newsResult.concat(result3.data.articles);
      console.log(preferenceArray[i]);
      console.log(newsResult.length);
    }
    // console.log("flage 1");
    // let result1 = await sendAxiosReq("cricket");
    // console.log("flage 2");
    // console.log(result1.data.articles.length);
    // let result2 = await sendAxiosReq("cars");
    // console.log("flage 3");
    // //console.log(result.data);
    // let result = result1.data.articles.concat(result2.data.articles);

    // console.log(result.length);
    res.send(newsResult);

    console.log("hello after await ");
  } catch (err) {}

  // res.send(result.data);
};

async function sendAxiosReq(query) {
  return axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: query,
      from: "2023-07-03",
      apiKey: process.env.API_KEY_NEWSAPI,
    },
  });
}

async function sendMultipleRequests(arr) {
  var newsResult = [];
  try {
    arr.forEach(async (element) => {
      let result = await sendAxiosReq(element);

      newsResult = newsResult.concat(result.data.articles);

      console.log(newsResult.length);
    });
    console.log("from async ffunton send multiple");
    console.log(newsResult);
    return newsResult;
  } catch (err) {
    console.log("error is from catch " + err);
  }
}

module.exports = getNews;
