const checkIsInPeriod = (req, res, next) => {
  const now = Date.now();
  // if (
  //   now > new Date("December 24, 2021 20:00:00 GMT+07:00") &&
  //   now < new Date("December 25, 2021 07:00:00 GMT+07:00")
  // ) {
  //   return next();
  // }
  if (
    now > new Date("November 28, 2021 20:00:00 GMT+07:00") &&
    now < new Date("December 25, 2021 07:00:00 GMT+07:00")
  ) {
    return next();
  }

  // return next(new Error('Yêu cầu chỉ được thực hiện trong thời gian quy định!'));
  // return res.status(401).json({error: 'Yêu cầu chỉ được thực hiện trong thời gian quy định!'});
};

module.exports = checkIsInPeriod;
