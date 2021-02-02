exports.getUserObj = (req, res, next) => {
  if (req.hasOwnProperty("user")) {
    return req.user;
  }
};

exports.getSiteUrl = () => {
  return "http://localhost:8080/";
};

exports.isValidEmail = (req, res, next) => {
  console.log(req);
};
