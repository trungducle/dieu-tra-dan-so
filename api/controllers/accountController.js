const { db, pgp } = require("../config/database");
const { hash } = require("bcrypt");
const { ROLES } = require("../config/keys");

module.exports = {
  createAccount: async (req, res) => {
    const accounts = req.body;
    const { role } = req.user;
    const saltRounds = 10;
    const insertValues = await Promise.all(
      accounts.map(async (acc) => {
        const hashedPassword = await hash(acc.password, saltRounds);
        return {
          ma_dang_nhap: acc.username,
          mat_khau: hashedPassword,
          loai_tai_khoan: role + 1,
        };
      })
    );

    const columnSet = new pgp.helpers.ColumnSet(
      ["ma_dang_nhap", "mat_khau", "loai_tai_khoan"],
      { table: "tai_khoan" }
    );


    try {
      await db.none(pgp.helpers.insert(insertValues, columnSet));
      res.status(200).json({ message: "Đã thêm tài khoản mới!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  togglePrivileges: async (req, res) => {
    const { lock } = req.body;
    const { username, role } = req.user;
    try {
      const updateTuple =
        role === ROLES.A1
          ? [lock, 0, "", role + 1]
          : [lock, username.length, username, role + 1];

      await db.none(
        "UPDATE tai_khoan SET bi_khoa_quyen = $1\
        WHERE\
          SUBSTRING(ma_dang_nhap, 1, $2) = $3\
          AND loai_tai_khoan >= $4",
        updateTuple
      );

      res.status(200).json({ message: "Thay đổi quyền tài khoản thành công!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
