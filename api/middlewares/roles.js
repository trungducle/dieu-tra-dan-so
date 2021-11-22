const checkRole = (req, res, next) => {
  const { username, password } = req.body;
  const user = {
    username,
    password,
    role: ""
  };

  if (!isNaN(username)) {
    switch (username.length) {
      case 2:
        user.role = "A2";
        break;
      case 4:
        user.role = "A3";
        break;
      case 6:
        user.role = "B1";
        break;
      case 8:
        user.role = "B2";
        break;
      default:
        break;
    }
  } else {
    user.role = "A1";
  }

  req.user = user;
  next();
};

module.exports = checkRole;