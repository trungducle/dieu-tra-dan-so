const { START_DATE, END_DATE } = require("../config/keys");

const checkIsInPeriod = (req, res, next) => {
  const now = Date.now();
  if (now >= START_DATE && now <= END_DATE) {
    return next();
  }

  return res
    .status(403)
    .json({ error: "Yêu cầu chỉ được thực hiện trong thời gian quy định!" });
};

module.exports = checkIsInPeriod;
