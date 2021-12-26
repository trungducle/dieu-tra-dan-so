const { db } = require("../config/database");

module.exports = {
  analyseByAge: async (req, res) => {
    const { filter, values } = req.body;
    let result = null;
    try {
      if (!filter) {
        result = await db.any(
          "SELECT EXTRACT(YEAR FROM AGE(ngay_sinh)) tuoi, COUNT(*) so_luong\
          FROM ca_nhan GROUP BY tuoi"
        );
      } else {
        switch (filter) {
          case "city":
            result = await db.any(
              "SELECT EXTRACT(YEAR FROM AGE(ngay_sinh)) tuoi, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tt.ten = ANY($1)\
              GROUP BY tuoi",
              [values]
            );
            break;
          case "district":
            result = await db.any(
              "SELECT EXTRACT(YEAR FROM AGE(ngay_sinh)) tuoi, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE qh.ten = ANY($1)\
              GROUP BY tuoi",
              [values]
            );
            break;
          case "ward":
            result = await db.any(
              "SELECT EXTRACT(YEAR FROM AGE(ngay_sinh)) tuoi, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE px.ten = ANY($1)\
              GROUP BY tuoi",
              [values]
            );
            break;
          case "village":
            result = await db.any(
              "SELECT EXTRACT(YEAR FROM AGE(ngay_sinh)) tuoi, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tb.ten = ANY($1)\
              GROUP BY tuoi",
              [values]
            );
            break;
          default:
            break;
        }
      }
      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  analyseByEducationLevel: async (req, res) => {
    const { filter, values } = req.body;
    let result = null;
    try {
      if (!filter) {
        result = await db.any(
          "SELECT trinh_do_van_hoa, COUNT(*) so_luong\
          FROM ca_nhan GROUP BY trinh_do_van_hoa"
        );
      } else {
        switch (filter) {
          case "city":
            result = await db.any(
              "SELECT trinh_do_van_hoa, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tt.ten = ANY($1)\
              GROUP BY trinh_do_van_hoa",
              [values]
            );
            break;
          case "district":
            result = await db.any(
              "SELECT trinh_do_van_hoa, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE qh.ten = ANY($1)\
              GROUP BY trinh_do_van_hoa",
              [values]
            );
            break;
          case "ward":
            result = await db.any(
              "SELECT trinh_do_van_hoa, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE px.ten = ANY($1)\
              GROUP BY trinh_do_van_hoa",
              [values]
            );
            break;
          case "village":
            result = await db.any(
              "SELECT trinh_do_van_hoa, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tb.ten = ANY($1)\
              GROUP BY trinh_do_van_hoa",
              [values]
            );
            break;
          default:
            break;
        }
      }

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  analyseByReligion: async (req, res) => {
    const { filter, values } = req.body;
    let result = null;
    try {
      if (!filter) {
        result = await db.any(
          "SELECT ton_giao, COUNT(*) so_luong\
          FROM ca_nhan GROUP BY ton_giao"
        );
      } else {
        switch (filter) {
          case "city":
            result = await db.any(
              "SELECT ton_giao, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tt.ten = ANY($1)\
              GROUP BY ton_giao",
              [values]
            );
            break;
          case "district":
            result = await db.any(
              "SELECT ton_giao, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE qh.ten = ANY($1)\
              GROUP BY ton_giao",
              [values]
            );
            break;
          case "ward":
            result = await db.any(
              "SELECT ton_giao, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE px.ten = ANY($1)\
              GROUP BY ton_giao",
              [values]
            );
            break;
          case "village":
            result = await db.any(
              "SELECT ton_giao, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tb.ten = ANY($1)\
              GROUP BY ton_giao",
              [values]
            );
            break;
          default:
            break;
        }
      }

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  analyseBySex: async (req, res) => {
    const { filter, values } = req.body;
    let result = null;
    try {
      if (!filter) {
        result = await db.any(
          "SELECT gioi_tinh, COUNT(*) so_luong\
          FROM ca_nhan GROUP BY gioi_tinh"
        );
      } else {
        switch (filter) {
          case "city":
            result = await db.any(
              "SELECT gioi_tinh, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tt.ten = ANY($1)\
              GROUP BY gioi_tinh",
              [values]
            );
            break;
          case "district":
            result = await db.any(
              "SELECT gioi_tinh, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE qh.ten = ANY($1)\
              GROUP BY gioi_tinh",
              [values]
            );
            break;
          case "ward":
            result = await db.any(
              "SELECT gioi_tinh, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE px.ten = ANY($1)\
              GROUP BY gioi_tinh",
              [values]
            );
            break;
          case "village":
            result = await db.any(
              "SELECT gioi_tinh, COUNT(*) so_luong\
              FROM ca_nhan cn\
              JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
              JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
              JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
              JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
              JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
              WHERE tb.ten = ANY($1)\
              GROUP BY gioi_tinh",
              [values]
            );
            break;
          default:
            break;
        }
      }

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  analyseByPopulation: async (req, res) => {
    const { filter, values } = req.body;
    // values sẽ là một array chứa tên các địa phương, ví dụ ['Cầu Giấy', 'Đan Phượng', 'Nam Từ Liêm']
    let result = null;
    try {
      switch (filter) {
        case "city":
          result = await db.any(
            "SELECT COUNT(*) dan_so, tt.ten\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            JOIN tinh_thanh tt ON qh.id_tinh_thanh = tt.id\
            WHERE tt.ten = ANY($1)\
            GROUP BY tt.ten",
            [values]
          );
          break;
        case "district":
          result = await db.any(
            "SELECT COUNT(*) dan_so, qh.ten\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            JOIN quan_huyen qh ON px.id_quan_huyen = qh.id\
            WHERE qh.ten = ANY($1)\
            GROUP BY qh.ten",
            [values]
          );
          break;
        case "ward":
          result = await db.any(
            "SELECT COUNT(*) dan_so, px.ten\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            JOIN phuong_xa px ON tb.id_phuong_xa = px.id\
            WHERE px.ten = ANY($1)\
            GROUP BY px.ten",
            [values]
          );
          break;
        case "village":
          result = await db.any(
            "SELECT COUNT(*) dan_so, tb.ten\
            FROM ca_nhan cn\
            JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
            JOIN thon_ban_tdp tb ON hd.id_thon_ban_tdp = tb.id\
            WHERE tb.ten = ANY($1)\
            GROUP BY tb.ten",
            [values]
          );
          break;
        default:
          break;
      }

      res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};