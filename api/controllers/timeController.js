const { db } = require("../config/database");

const checkEndTime = async (req, res) => {
  try {
    const result = await db.one(
      "SELECT ngay_ket_thuc FROM dieu_tra_dan_so\
      WHERE tai_khoan = $1;",
      [req.user.username]
    );
    const endTime = new Date(result.ngay_ket_thuc);
    const endDate = endTime.getDate(),
      endMonth = endTime.getMonth() + 1, // tháng n thì endMonth = n - 1
      endYear = endTime.getFullYear(),
      endHours = endTime.getHours() % 12, // định dạng 12h
      endMinutes = endTime.getMinutes() === 0 ? "" : endTime.getMinutes();
    res.status(200).json({
      end: `${endHours}h${endMinutes} ngày ${endDate}/${endMonth}/${endYear}`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = checkEndTime;
