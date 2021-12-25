const { db } = require("../config/database");

const UNITS = {
  VILLAGE: "village", // thôn, bản, làng
  WARD: "ward", // phường, xã
  DISTRICT: "district", // quận, huyện
  CITY: "city", // tỉnh, thành
};

module.exports = {
  getCitizenAmount: async (req, res) => {
    const { roleId, username } = req.user;

    try {
      if (roleId === 1) {
        const result = await db.any(
          "SELECT COUNT(*) dan_so FROM ca_nhan"
        );
        res.status(200).json({ amount: result[0].dan_so });
      } else {
        const searchPattern = `${username}%`;
        const result = await db.any(
          "SELECT COUNT(*) dan_so\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            WHERE tb.ma LIKE $1",
          [searchPattern]);
        res.status(200).json({ amount: result[0].dan_so });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  queryCitizenAmount: async (req, res) => {
    // eg. localhost:8000/citizen/amount (Tim dan so cua ca nuoc)
    const { filter, values } = req.body;
    // values sẽ là một array chứa tên các địa phương, ví dụ ['Cầu Giấy', 'Đan Phượng', 'Nam Từ Liêm']

    try {
      if (!filter) {
        // Không có filter thì sẽ lấy dân số theo cả nước
        const result = await db.any(
          "SELECT COUNT(*) dan_so FROM ca_nhan"
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'city') {
        const result = await db.any(
          "SELECT COUNT(*) dan_so\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE tt.ten = ANY($1)",
          [values]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'district') {
        const result = await db.any(
          "SELECT COUNT(*) dan_so\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            WHERE qh.ten = ANY($1)",
          [values]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'ward') {
        const result = await db.any(
          "SELECT COUNT(*) dan_so\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            WHERE px.ten = ANY($1)",
          [values]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'village') {
        const result = await db.any(
          "SELECT COUNT(*) dan_so\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            WHERE tb.ten = ANY($1)",
          [values]
        );
        
        res.status(200).json({ amount: result[0].dan_so });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getCitizenList: async (req, res) => {
    const { filter, page } = req.query;
    const { values } = req.body;
    // eg. localhost:8000/citizen/list
    // eg. localhost:8000/citizen/list?filter=city&page=1

    const ROWS = 10; // Moi trang hien thi 10 nguoi
    const offset = ROWS * (page - 1);

    try {
      if (!filter) {
        const result = await db.any("SELECT * FROM ca_nhan");

        res.status(200).json({ result });
      } else if (filter === "city") {
        const result = await db.any(
          "SELECT\
            cn.*,\
            tb.ma ma_tb, tb.ten ten_tb,\
            px.ma ma_px, px.ten ten_px,\
            qh.ma ma_qh, qh.ten ten_qh,\
            tt.ma ma_tt, tt.ten ten_tt\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE tt.ten = ANY($1)\
            LIMIT $2 OFFSET $3",
          [values, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "district") {
        const result = await db.any(
          "SELECT cn.*,\
            tb.ma ma_tb, tb.ten ten_tb,\
            px.ma ma_px, px.ten ten_px,\
            qh.ma ma_qh, qh.ten ten_qh,\
            tt.ma ma_tt, tt.ten ten_tt\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE qh.ten = ANY($1)\
            LIMIT $2 OFFSET $3",
          [values, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "ward") {
        const result = await db.any(
          "SELECT cn.*,\
            tb.ma ma_tb, tb.ten ten_tb,\
            px.ma ma_px, px.ten ten_px,\
            qh.ma ma_qh, qh.ten ten_qh,\
            tt.ma ma_tt, tt.ten ten_tt\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE px.ten = ANY($1)\
            LIMIT $2 OFFSET $3",
          [values, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "village") {
        const result = await db.any(
          "SELECT cn.*,\
            tb.ma ma_tb, tb.ten ten_tb,\
            px.ma ma_px, px.ten ten_px,\
            qh.ma ma_qh, qh.ten ten_qh,\
            tt.ma ma_tt, tt.ten ten_tt\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE tb.ten = ANY($1)\
            LIMIT $2 OFFSET $3",
          [values, ROWS, offset]
        );

        res.status(200).json({ result });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
