const { db } = require("../config/database");
const { ROLES } = require("../config/keys");

module.exports = {
  createDepartment: async (req, res) => {
    const name = req.body;
    const { id, username, role } = req.user;

    try {
      const status = await db.any(
        "SELECT bi_khoa_quyen FROM tai_khoan\
        WHERE username=$1",
        username
      );

      if (status === true) {
        return res
          .status(403)
          .json({ error: "Bạn không có quyền chỉnh sửa!" });
      }

      switch (role) {
        case ROLES.A1:
          await db.none(
            "INSERT INTO tinh_thanh(ten)\
            VALUES($1)",
            name
          );
          break;
        case ROLES.A2:
          await db.none(
            "INSERT INTO quan_huyen(ten, id_tinh_thanh)\
            VALUES($1, $2)",
            name, id
          );
          break;
        case ROLES.A3:
          await db.none(
            "INSERT INTO quan_huyen(ten, id_quan_huyen)\
            VALUES($1, $2)",
            name, id
          );
          break;
        case ROLES.B1:
          await db.none(
            "INSERT INTO thon_ban_tdp(ten, id_phuong_xa)\
            VALUES($1, $2)",
            name, id
          );
          break;
        default:
          return res
            .status(403)
            .json({ error: "Bạn không có quyền chỉnh sửa!" });
      }
      res.status(200).json({ message: "Đơn vị và tài khoản mặc định cho đơn vị được tạo thành công!" });  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};