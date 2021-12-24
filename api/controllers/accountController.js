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
    const { lock, enddate } = req.body;
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
          AND loai_tai_khoan = $4",
        updateTuple
      );

      if (enddate) {
        // Nếu có enddate thì sẽ yêu cầu mở khai báo đăng nhập
        if (Date.now() >= Date.parse(enddate)) {
          return res.status(401).json({ error: "Thời gian kết thúc phải sau thời điểm hiện tại" });
        } else {
          let updateTuple =
            roleId === ROLES.A1
              ? [enddate, 0, "", roleId + 1]
              : [enddate, username.length, username, roleId + 1];
          await db.none(
            "UPDATE dieu_tra_dan_so\
            SET ngay_bat_dau = now(),\
              ngay_ket_thuc = $1,\
              hoan_thanh = false\
            WHERE\
              SUBSTRING(tai_khoan, 1, $2) = $3\
              AND loai_tai_khoan = $4",
            updateTuple
          );
          return res.status(200).json({ message: "Mở khai báo thành công!" });
        }
      } else {
        // Nếu không có enddate thì sẽ là xác nhận hoàn thành khai báo
        let updateTuple =
          roleId === ROLES.A1 ? [0, "", roleId + 1] : [username.length, username, roleId + 1];

        await db.none(
          "UPDATE dieu_tra_dan_so\
            SET hoan_thanh = true\
            WHERE SUBSTRING(tai_khoan, 1, $1) = $2\
            AND loai_tai_khoan = $3",
          updateTuple
        );

        return res.status(200).json({ message: "Đã xác nhận hoàn thành khai báo!" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
