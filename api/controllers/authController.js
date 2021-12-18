const { db } = require("../config/database");
const { compare } = require("bcrypt");
const { getAccessToken } = require("../config/auth");

module.exports = {
  handleLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await db.any(
        "SELECT t.*, l.ten FROM tai_khoan t\
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

      const accessToken = getAccessToken({
        id: result[0].id,
        username: result[0].ten_dang_nhap,
        roleId: result[0].loai_tai_khoan,
        roleName: result[0].ten,
        isPrivLocked: result[0].bi_khoa_quyen
      });
      // res.status(200).json({ accessToken });
      res.status(200).json(result[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
