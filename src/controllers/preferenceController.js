var getPreference = (req, res) => {
  var data = {};
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
  res.send(req.user);
};

module.exports = { getPreference, putPreference };
