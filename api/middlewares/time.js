const { db } = require("../config/database");

const checkIsInPeriod = async (req, res, next) => {
  const { username } = req.user;
  const now = Date.now();

  const censusTime = await db.one(
    "SELECT ngay_bat_dau, ngay_ket_thuc\
    FROM dieu_tra_dan_so WHERE tai_khoan = $1",
    [username]
  );

  const startDate = censusTime.ngay_bat_dau;
  const endDate = censusTime.ngay_ket_thuc;

  console.log(startDate + " " + endDate + " " + now);

  if (now >= Date.parse(startDate) && now <= Date.parse(endDate)) {
    return next();
  }

  return res.status(403).json({ error: "Ngoài thời gian khai báo!" });
};

module.exports = checkIsInPeriod;
