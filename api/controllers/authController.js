const { db } = require("../config/database");
const { compare } = require("bcrypt");
const { getAccessToken } = require("../config/auth");

module.exports = {
  handleLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await db.any(
        "SELECT t.id, t.mat_khau, t.loai_tai_khoan, t.bi_khoa_quyen, l.ten\
        FROM tai_khoan t\
        JOIN loai_tai_khoan l ON l.id = t.loai_tai_khoan\
        WHERE t.ma_dang_nhap = $1",
        [username]
      );

      if (result.length === 0) {
        return res
          .status(401)
          .json({ error: "Tên đăng nhập hoặc mật khẩu không đúng!" });
      }

      const isMatchPassword = await compare(password, result[0].mat_khau);
      if (!isMatchPassword) {
        return res
          .status(401)
          .json({ error: "Tên đăng nhập hoặc mật khẩu không đúng!" });
      }

      let unitId = null;
      if (!isNaN(username)) {
        const usernameLength = username.length;

        switch (usernameLength) {
          case 4:
            unitId = (
              await db.one(
                "SELECT id FROM quan_huyen WHERE ma = $1;",
                [username]
              )
            ).id;
            break;

          case 6:
            unitId = (
              await db.one(
                "SELECT id FROM phuong_xa WHERE ma = $1;",
                [username]
              )
            ).id;
            break;

          case 8:
            unitId = (
              await db.one(
                "SELECT id FROM thon_ban_tdp WHERE ma = $1;",
                [username]
              )
            ).id;
            break;

          default:
            break;
        }
      }

      const accessToken = getAccessToken({
        unitId,
        username,
        accountId: result[0].id,
        roleId: result[0].loai_tai_khoan,
        roleName: result[0].ten,
        isPrivLocked: result[0].bi_khoa_quyen
      });
      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
