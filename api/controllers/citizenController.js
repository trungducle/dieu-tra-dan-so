const { db } = require("../config/database");

const UNITS = {
  VILLAGE: "village", // thôn, bản, làng
  WARD: "ward", // phường, xã
  DISTRICT: "district", // quận, huyện
  CITY: "city", // tỉnh, thành
};

module.exports = {
  getCitizenAmount: async (req, res) => {
    // eg. localhost:8000/citizen/amount (Tim dan so cua ca nuoc)
    // eg. localhost:8000/citizen/amount?filter=city&value=Ha Noi (Tim dan so cua thanh pho Ha Noi)
    // eg. localhost:8000/citizen/amount?filter=district&value=A (Tim dan so cua cac quan, huyen bat bau bang A)
    const { filter, value } = req.query;
    // Neu do dai la 1 thi tim kiem theo ky tu dau, neu khong tim kiem theo ten day du
    const searchPattern = value.length === 1 ? `${value}%` : value;

    try {
      if (!filter) {
        const result = await db.any(
          "SELECT count(*) dan_so FROM ca_nhan"
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'city') {
        const result = await db.any(
          "SELECT count(*)\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
          JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
          WHERE tt.ten LIKE $1",
          [searchPattern]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'district') {
        const result = await db.any(
          "SELECT count(*)\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
          WHERE qh.ten LIKE $1",
          [searchPattern]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'ward') {
        const result = await db.any(
          "SELECT count(*)\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          WHERE px.ten LIKE $1",
          [searchPattern]
        );

        res.status(200).json({ amount: result[0].dan_so });
      } else if (filter === 'village') {
        const result = await db.any(
          "SELECT count(*)\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          WHERE tb.ten LIKE $1",
          [searchPattern]
        );
        
        res.status(200).json({ amount: result[0].dan_so });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getCitizenList: async (req, res) => {
    const { filter, page, value } = req.query;
    // eg. localhost:8000/citizen/list
    // eg. localhost:8000/citizen/list?filter=city&page=1

    const ROWS = 10; // Moi trang hien thi 10 nguoi
    const offset = ROWS * (page - 1);
    const searchPattern = value.length === 1 ? `${value}%` : value;

    try {
      if (!filter) {
        const result = await db.any("SELECT * FROM ca_nhan");

        res.status(200).json({ result });
      } else if (filter === "city") {
        const result = await db.any(
          "SELECT *\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
          JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
          WHERE tt.ten LIKE $1\
          LIMIT $2 OFFSET $3",
          [searchPattern, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "district") {
        const result = await db.any(
          "SELECT *\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
          WHERE qh.ten LIKE $1\
          LIMIT $2 OFFSET $3",
          [searchPattern, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "ward") {
        const result = await db.any(
          "SELECT *\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
          WHERE px.ten LIKE $1\
          LIMIT $2 OFFSET $3",
          [searchPattern, ROWS, offset]
        );

        res.status(200).json({ result });
      } else if (filter === "village") {
        const result = await db.any(
          "SELECT *\
          FROM ca_nhan cn\
          JOIN ho_dan hd ON cn.id_ho_dan = ho_dan.id\
          JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
          WHERE tb.ten LIKE $1\
          LIMIT $2 OFFSET $3",
          [searchPattern, ROWS, offset]
        );

        res.status(200).json({ result });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getCitizenData: async (req, res) => {
    // to do (doi thong tin day du ve cac cot bang ca nhan)
  },
};
