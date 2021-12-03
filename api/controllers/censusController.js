const { db, pgp } = require("../config/database");

module.exports = {
  uploadData: async (req, res) => {
    const citizens = req.body;

    const insertValues = await Promise.all(
      citizens.map(async (citizen) => {
        return {
          ho_ten: citizen.fullname,
          ngay_sinh: citizen.dob,
          gioi_tinh: citizen.sex,
          quoc_tich: citizen.nationality,
          ma_dinh_danh: citizen.identityNumber,
          dan_toc: citizen.ethnic,
          ton_giao: citizen.religion,
          que_quan: citizen.placeOfOrigin,
          thuong_tru: citizen.placeOfResidence,
          noi_o_hien_nay: citizen.currentPlace,
          chu_ho: citizen.isHeadOfHousehold
        };
      })
    );

    const columnSet = new pgp.helpers.ColumnSet(
      ["ho_ten",
      "ngay_sinh",
      "gioi_tinh",
      "quoc_tich",
      "ma_dinh_danh",
      "dan_toc",
      "ton_giao",
      "que_quan",
      "thuong_tru",
      "noi_o_hien_nay",
      "chu_ho"],
      { table: "ca_nhan" }
    );

    try {
      await db.none(pgp.helpers.insert(insertValues, columnSet));
      res.status(200).json({ message: "Khai báo thông tin thành công!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  superviseProgress: async (req, res) => {

  },
  completeCensus: async (req, res) => {
    
  }
};