const { db } = require("../config/database");
const { ROLES } = require("../config/keys");

module.exports = {
  createDepartment: async (req, res) => {
    const { name } = req.body;
    const { username, roleId, unitId } = req.user;

    try {
      const status = await db.one(
        "SELECT bi_khoa_quyen FROM tai_khoan\
        WHERE username = $1",
        [username]
      );

      if (status.bi_khoa_quyen) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      switch (roleId) {
        case ROLES.A1:
          await db.none(
            "INSERT INTO tinh_thanh(ten) VALUES($1)",
            [name]
          );
          break;
        case ROLES.A2:
          await db.none(
            "INSERT INTO quan_huyen(ten, id_tinh_thanh)\
            VALUES($1, $2)",
            [name, unitId]
          );
          break;
        case ROLES.A3:
          await db.none(
            "INSERT INTO phuong_xa(ten, id_quan_huyen)\
            VALUES($1, $2)",
            [name, unitId]
          );
          break;
        case ROLES.B1:
          await db.none(
            "INSERT INTO thon_ban_tdp(ten, id_phuong_xa)\
            VALUES($1, $2)",
            [name, unitId]
          );
          break;
        default:
          return res.status(403).json({ error: "Unauthorized" });
      }
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getDirectInferiorList: async (req, res) => {
    // eg. localhost:8000/departments
    const { username, roleId } = req.user;
    try {
      let info = null;
      let amount = null;
      const codeLength = roleId === ROLES.A1 ? 0 : username.length;
      switch (roleId) {
        case ROLES.A1:
          info = await db.any(
            "SELECT ten, ma, dan_so FROM (\
              SELECT tt.ten, tt.ma, count(*) dan_so\
                FROM tinh_thanh tt\
                JOIN quan_huyen qh ON qh.id_tinh_thanh = tt.id\
                JOIN phuong_xa px ON px.id_quan_huyen = qh.id \
                JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
                JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
                JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
                GROUP BY tt.ma, tt.ten\
              UNION\
              SELECT ten, ma, 0\
                FROM tinh_thanh\
                WHERE ma NOT IN (\
                  SELECT tt.ma\
                    FROM tinh_thanh tt\
                    JOIN quan_huyen qh ON qh.id_tinh_thanh = tt.id\
                    JOIN phuong_xa px ON px.id_quan_huyen = qh.id\
                    JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
                    JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
                    JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
                    GROUP BY tt.ma)\
            ) res ORDER BY ma"
          );
          amount = (
            await db.one("SELECT count(*) so_don_vi FROM tinh_thanh")
          ).so_don_vi;
          break;
        case ROLES.A2:
          info = await db.any(
            "SELECT qh.ten, qh.ma, count(*) dan_so\
              FROM quan_huyen qh\
              JOIN phuong_xa px ON px.id_quan_huyen = qh.id \
              JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
              JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
              JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
              WHERE SUBSTRING(qh.ma, 1, $1) = $2\
              GROUP BY qh.ma, qh.ten\
            UNION\
            SELECT ten, ma, 0\
              FROM quan_huyen WHERE ma NOT IN (\
                SELECT qh.ma\
                  FROM quan_huyen qh\
                  JOIN phuong_xa px ON px.id_quan_huyen = qh.id \
                  JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
                  JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
                  JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
                  WHERE SUBSTRING(qh.ma, 1, $1) = $2\
                  GROUP BY qh.ma)\
              AND SUBSTRING(ma, 1, $1) = $2",
            [codeLength, username]
          );
          amount = (
            await db.one(
              "SELECT count(*) so_don_vi FROM quan_huyen\
              WHERE SUBSTRING(ma, 1, $1) = $2",
              [codeLength, username]
            )
          ).so_don_vi;
          break;
        case ROLES.A3:
          info = await db.any(
            "SELECT px.ten, px.ma, count(*) dan_so\
              FROM phuong_xa px\
              JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
              JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
              JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
              WHERE SUBSTRING(px.ma, 1, $1) = $2\
              GROUP BY px.ma, px.ten\
            UNION\
            SELECT ten, ma, 0\
              FROM phuong_xa WHERE ma NOT IN (\
                SELECT px.ma\
                  FROM phuong_xa px\
                  JOIN thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
                  JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
                  JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
                  WHERE SUBSTRING(px.ma, 1, $1) = $2\
                  GROUP BY px.ma\
                )\
              AND SUBSTRING(ma, 1, $1) = $2",
          [codeLength, username]
          );
          amount = (
            await db.one(
              "SELECT count(*) so_don_vi FROM phuong_xa\
              WHERE SUBSTRING(ma, 1, $1) = $2",
              [codeLength, username]
            )
          ).so_don_vi;
          break;
        case ROLES.B1:
          info = await db.any(
            "SELECT tb.ten, tb.ma, count(*) dan_so\
              FROM thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
              JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
              JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
              WHERE SUBSTRING(tb.ma, 1, $1) = $2\
              GROUP BY tb.ma, tb.ten\
            UNION\
            SELECT ten, ma FROM thon_ban_tdp\
              WHERE ma NOT IN (\
                SELECT tb.ma\
                  FROM thon_ban_tdp tb ON tb.id_phuong_xa = px.id\
                  JOIN ho_dan hd ON hd.id_thon_ban_tdp = tb.id\
                  JOIN ca_nhan cn ON cn.id_ho_dan = hd.id\
                  WHERE SUBSTRING(tb.ma, 1, $1) = $2\
                  GROUP BY tb.ma\
                )\
              AND SUBSTRING(ma, 1, $1) = $2",
            [codeLength, username]
          );
          amount = (
            await db.one(
              "SELECT count(*) so_don_vi FROM thon_ban_tdp\
              WHERE SUBSTRING(ma, 1, $1) = $2",
              [codeLength, username]
            )
          ).so_don_vi;
          break;
        case ROLES.B2:
          info = [];
          amount = 0;
          break;
      }
      res.status(200).json({ info, amount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getInferiorAmount: async (req, res) => {
    const { username, roleId } = req.user;
    const codeLength = roleId === ROLES.A1 ? 0 : username.length;
    const searchPattern = roleId === ROLES.A1 ? '' : username;

    try {
      const amount = (
        await db.one(
          "SELECT count(*) - 1 so_don_vi FROM tai_khoan\
          WHERE SUBSTRING(ma_dang_nhap, 1, $1) = $2",
          [codeLength, searchPattern]
        )
      ).so_don_vi;

      res.status(200).json({ amount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
