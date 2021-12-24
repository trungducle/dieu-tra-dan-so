const { db, pgp } = require("../config/database");
const { hash } = require("bcrypt");
const { ROLES } = require("../config/keys");

module.exports = {
  createAccount: async (req, res) => {
    const accounts = req.body;
    const { roleId } = req.user;
    const saltRounds = 10;
    const insertValues = await Promise.all(
      accounts.map(async (acc) => {
        const hashedPassword = await hash(acc.password, saltRounds);
        return {
          ma_dang_nhap: acc.username,
          mat_khau: hashedPassword,
          loai_tai_khoan: roleId + 1,
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
    const { username, roleId } = req.user;
    try {
      const updateTuple =
        roleId === ROLES.A1
          ? [lock, 0, "", roleId + 1]
          : [lock, username.length, username, roleId + 1];

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
  },
  checkOwnPrivileges: async (req, res) => {
    try {
      const result = await db.one(
        "SELECT bi_khoa_quyen FROM tai_khoan WHERE id = $1;",
        [req.user.accountId]
      );
      res.status(200).json({ isPrivLocked: result.bi_khoa_quyen });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
