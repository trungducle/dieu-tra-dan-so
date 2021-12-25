module.exports = {
  checkIsHigherRoleThan: (role) => (req, res, next) => {
    return req.user.roleId >= role
      ? res.status(403).json({ error: "Unauthorized" })
      : next();
  },
  checkIsLowerRoleThan: (role) => (req, res, next) => {
    return req.user.roleId <= role
      ? res.status(403).json({ error: "Unauthorized" })
      : next();
  },
};
