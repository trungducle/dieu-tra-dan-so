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
          await db.none("INSERT INTO tinh_thanh(ten) VALUES($1)", [name]);
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
  getCityList: async (req, res) => {
    // danh sách tỉnh, thành
    try {
      const result = await db.any("SELECT * FROM tinh_thanh");
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getDistrictList: async (req, res) => {
    // danh sách quận, huyện
    const { username, roleId } = req.user;
    try {
      const codeLength = roleId === ROLES.A1 ? 0 : username.length;
      const result = await db.any(
        "SELECT * FROM quan_huyen\
        WHERE SUBSTRING(ma, 1, $1) = $2",
        [codeLength, username]
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getWardList: async (req, res) => {
    // danh sách phường, xã
    const { username, roleId } = req.user;
    try {
      const codeLength = roleId === ROLES.A1 ? 0 : username.length;
      const result = await db.any(
        "SELECT * FROM xa_phuong\
        WHERE SUBSTRING(ma, 1, $1) = $2",
        [codeLength, username]
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getVillageList: async (req, res) => {
    // danh sách thôn, bản, tổ dân phố
    const { username, roleId } = req.user;
    try {
      const codeLength = roleId === ROLES.A1 ? 0 : username.length;
      const result = await db.any(
        "SELECT * FROM thon_ban_tdp\
        WHERE SUBSTRING(ma, 1, $1) = $2",
        [codeLength, username]
      );

      res.status(200).json(result.map((r) => ({
        ...r,
        ma: r.ma.substring(6)
      })));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
