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
  superviseProgress: async (req, res) => {
    const { username, roleId } = user.req;
    const queryString = roleId === 1 ? '' : username;
    const codeLength = roleId === 1 ? 0 : username.length;

    try {
      const progress = db.one(
        "SELECT count(*) tien_do\
        FROM dieu_tra_dan_so\
        WHERE hoan_thanh = true\
          AND SUBSTRING(tai_khoan, 1, $1) = $2\
          AND loai_tai_khoan = $3",
        [codeLength, queryString, roleId + 1]
      ).tien_do;

      const progressDetails = null;
      switch (roleId) {
        case 1:
          progressDetails = db.any(
            "SELECT tt.ma, tt.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN tinh_thanh tt ON dt.tai_khoan = tt.ma"
          );
          break;
        case 2:
          progressDetails = db.any(
            "SELECT qh.ma, qh.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN quan_huyen qh ON dt.tai_khoan = qh.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2",
            [codeLength, queryString]
          );
          break;
        case 3:
          progressDetails = db.any(
            "SELECT px.ma, px.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN phuong_xa px ON dt.tai_khoan = px.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2",
            [codeLength, queryString]
          );
          break;
        case 4:
          progressDetails = db.any(
            "SELECT tb.ma, tb.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN thon_ban_tdp tb ON dt.tai_khoan = tb.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2",
            [codeLength, queryString]
          );
          break;
        default:
          progressDetails = [];
      }

      res.status(200).json({ progress, progressDetails });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
