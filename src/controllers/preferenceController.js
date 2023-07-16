var getPreference = (req, res) => {
  var data = {};
  if (req.user == undefined) {
    if (req.message == "Authorization header not found") {
      data.message = "Authorization header not found";
    } else data.message = "invalid user";
    res.status(400).send(data);
  }

  data.fullName = req.user.fullName;
  data.preference = req.user.preference;
  //   let pref = req.user.preference.map((obj) => {
  //     return obj.title;
  //   });

  //data.preferenceArray = pref;

  res.status(200).send(data);
};

var putPreference = (req, res) => {
  req.user.password = undefined;
  req.user.email = undefined;
  req.user.preference = req.body.preferences;
  res.status(200).send(req.user);
};

module.exports = { getPreference, putPreference };
