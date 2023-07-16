var getPreference = (req, res) => {
  var data = {};
  data.fullName = req.user.fullName;
  data.preference = req.user.preference;
  //   let pref = req.user.preference.map((obj) => {
  //     return obj.title;
  //   });

  //data.preferenceArray = pref;

  res.send(data);
};

module.exports = { getPreference };
