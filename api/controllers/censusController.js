const { db, pgp } = require("../config/database");
const { ROLES } = require("../config/keys");

module.exports = {
  createNewHousehold: async (req, res) => {
    const { villageId } = req.body;
    try {
      const result = await db.one(
        "INSERT INTO ho_dan (id_thon_ban_tdp)\
        VALUES ($1) RETURNING id, SUBSTRING(ma, 9) ma_ho_dan;",
        [villageId]
      );

      res.status(200).json({
        id: result.id,
        householdCode: result.ma_ho_dan,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  uploadData: async (req, res) => {
    const citizen = req.body;
    const { username } = req.user;
    const { villageId } = req.params;
    const wardCode =
      username.length === 8 ? username.substring(0, 6) : username;
    const villageCode = citizen["villageCode"];
    const householdCode = `${wardCode}${villageCode}${citizen["household"]}`;

    try {
      const knownValues = {
        ho_ten: citizen["fullname"],
        ngay_sinh: citizen["dob"],
        gioi_tinh: citizen["sex"],
        ma_dinh_danh: citizen["identity"],
        dan_toc: citizen["ethnicity"],
        ton_giao: citizen["religion"],
        que_quan: citizen["origin"],
        thuong_tru: citizen["residence"],
        noi_o_hien_nay: citizen["current-place"],
        trinh_do_van_hoa: citizen["academic"],
        nghe_nghiep: citizen["job"],
        chu_ho: citizen["is-head"] === "Có" ? true : false,
      };

      let householdId = null;
      let newHousehold = null;
      const householdQueryResult = await db.any(
        "SELECT id FROM ho_dan WHERE ma = $1;",
        [householdCode]
      );

      if (householdQueryResult.length > 0) {
        householdId = householdQueryResult[0].id;
      } else {
        newHousehold = await db.one(
          "INSERT INTO ho_dan (ma, id_thon_ban_tdp)\
          VALUES ($1, $2) RETURNING id, SUBSTRING(ma, 9) ma_ho_dan;",
          [householdCode, villageId]
        );
        householdId = newHousehold.id;
      }

      const columnSet = new pgp.helpers.ColumnSet(
        [
          "ho_ten",
          "ngay_sinh",
          "gioi_tinh",
          "ma_dinh_danh",
          "dan_toc",
          "ton_giao",
          "que_quan",
          "thuong_tru",
          "noi_o_hien_nay",
          "chu_ho",
          "id_ho_dan",
          "trinh_do_van_hoa",
          "nghe_nghiep",
        ],
        { table: "ca_nhan" }
      );

      const individualId = citizen["id"];
      if (individualId) {
        // id cá nhân tồn tại => cập nhật bản ghi với id này
        const updateValue = {
          ...knownValues,
          id_ho_dan: householdId,
          id: individualId,
        };
        const condition = pgp.as.format("WHERE id = ${id}", updateValue);
        await db.none(
          `${pgp.helpers.update(updateValue, columnSet)} ${condition}`
        );
        res.status(200).json({ message: "Cập nhật thông tin thành công!" });
      } else {
        const insertValue = {
          ...knownValues,
          id_ho_dan: householdId,
        };
        await db.none(pgp.helpers.insert(insertValue, columnSet));
        res.status(200).json({
          message: "Khai báo thông tin thành công!",
          newHousehold,
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  deleteInfo: async (req, res) => {
    const { infoId, villageId } = req.params;
    try {
      await db.none(
        "DELETE FROM ca_nhan\
        USING ho_dan\
        WHERE ca_nhan.id = $1 AND ho_dan.id_thon_ban_tdp = $2",
        [infoId, villageId]
      );
      res.status(200).json({ message: "Xóa thông tin thành công!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getHouseholdList: async (req, res) => {
    // danh sách hộ dân
    const { villageId } = req.params;
    try {
      const result = await db.any(
        "SELECT id, SUBSTRING(ma, 9) ma_ho_dan FROM ho_dan\
        WHERE id_thon_ban_tdp = $1;",
        [villageId]
      );

      res.status(200).json(
        result.map((r) => ({
          id: r.id,
          householdCode: r.ma_ho_dan,
        }))
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getHouseholdDetails: async (req, res) => {
    const { householdId, villageId } = req.params;
    try {
      const result = await db.any(
        "SELECT cn.* FROM ca_nhan cn\
        JOIN ho_dan hd ON cn.id_ho_dan = hd.id\
        WHERE cn.id_ho_dan = $1 AND hd.id_thon_ban_tdp = $2;",
        [householdId, villageId]
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  superviseProgress: async (req, res) => {
    const { username, roleId } = req.user;
    const queryString = roleId === 1 ? "" : username;
    const codeLength = roleId === 1 ? 0 : username.length;

    try {
      let progressDetails = null;
      switch (roleId) {
        case ROLES.A1:
          progressDetails = await db.any(
            "SELECT tt.ma, tt.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN tinh_thanh tt ON dt.tai_khoan = tt.ma\
              ORDER BY tt.ma"
          );
          break;
        case ROLES.A2:
          progressDetails = await db.any(
            "SELECT qh.ma, qh.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN quan_huyen qh ON dt.tai_khoan = qh.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2\
              ORDER BY qh.ma",
            [codeLength, queryString]
          );
          break;
        case ROLES.A3:
          progressDetails = await db.any(
            "SELECT px.ma, px.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN phuong_xa px ON dt.tai_khoan = px.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2\
              ORDER BY px.ma",
            [codeLength, queryString]
          );
          break;
        case ROLES.B1:
          progressDetails = await db.any(
            "SELECT tb.ma, tb.ten, dt.hoan_thanh\
              FROM dieu_tra_dan_so dt\
              JOIN thon_ban_tdp tb ON dt.tai_khoan = tb.ma\
              WHERE SUBSTRING(tai_khoan, 1, $1) = $2\
              ORDER BY tb.ma",
            [codeLength, queryString]
          );
          break;
        default:
          progressDetails = [];
          break;
      }

      res.status(200).json({
        total: progressDetails.length,
        completed: progressDetails.filter((unit) => unit.hoan_thanh).length,
        details: progressDetails
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  confirmComplete: async (req, res) => {
    try {
      await db.none(
        "UPDATE dieu_tra_dan_so SET hoan_thanh = TRUE\
        WHERE tai_khoan = $1",
        [req.user.username]
      );
      res.status(200).json({ message: "Cập nhật tiến độ thành công!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  checkCompleteStatus: async (req, res) => {
    try {
      const result = await db.one(
        "SELECT hoan_thanh FROM dieu_tra_dan_so WHERE tai_khoan = $1",
        [req.user.username]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
};
