const { db, pgp } = require("../config/database");

module.exports = {
  uploadData: async (req, res) => {
    const citizen = req.body;
    const { username } = req.user;
    const insertValue = {
      ho_ten: citizen["fullname"],
      ngay_sinh: citizen["dob"],
      gioi_tinh: citizen["sex"],
      ma_dinh_danh: citizen["identity"],
      dan_toc: citizen["ethnicity"],
      ton_giao: citizen["religion"],
      que_quan: citizen["origin"],
      thuong_tru: citizen["residence"],
      noi_o_hien_nay: citizen["current-place"],
      trinh_do_van_hoa: citizen["academic"],
      id_ho_dan: `${username}${citizen["household"]}`,
      chu_ho: citizen["is-head"],
    };

    const columnSet = new pgp.helpers.ColumnSet(
      [
        "ho_ten",
        "ngay_sinh",
        "gioi_tinh",
        "ma_dinh_danh",
        "dan_toc",
        "ton_giao",
        "que_quan",
        "thuong_tru",
        "noi_o_hien_nay",
        "chu_ho",
        "id_ho_dan",
        "trinh_do_van_hoa",
      ],
      { table: "ca_nhan" }
    );

    try {
      await db.none(pgp.helpers.insert(insertValue, columnSet));
      res.status(200).json({ message: "Khai báo thông tin thành công!" });
      // res.json(insertValue);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  superviseProgress: async (req, res) => {},
  completeCensus: async (req, res) => {},
};
