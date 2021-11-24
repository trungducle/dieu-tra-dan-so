const { db } = require("../config/database");
const { compare } = require("bcrypt");
const { getAccessToken } = require("../config/auth");

module.exports = {
  handleLogin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const result = await db.any(
        "SELECT * FROM tai_khoan\
        WHERE ma_dang_nhap = $1",
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
        role: result[0].loai_tai_khoan,
      });
      res.status(200).json({ accessToken });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
