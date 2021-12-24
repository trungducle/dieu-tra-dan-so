const { START_DATE, END_DATE } = require("../config/keys");
const { db, pgp } = require("../config/database");

const checkIsInPeriod = (req, res, next) => {
  const { username } = req.user;
  const now = Date.now();

  const censusTime = db.one(
    "SELECT ngay_bat_dau, ngay_ket_thuc\
    FROM dieu_tra_dan_so WHERE tai_khoan = $1",
    username
  );

  const start_date = censusTime.ngay_bat_dau;
  const end_date = censusTime.ngay_ket_thuc;

  if (now >= Date.parse(start_date) && now <= Date.parse(end_date)) {
    return next();
  }

  return res.status(403).json({ error: "Ngoài thời gian khai báo!" });
};

module.exports = checkIsInPeriod;
