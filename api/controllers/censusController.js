const { db, pgp } = require("../config/database");

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
    const wardCode = username.length === 8 ? username.substring(0, 6) : username;
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

      const householdQueryResult = await db.one(
        "SELECT id FROM ho_dan WHERE ma = $1;",
        [householdCode]
      );

      let householdId = null;
      if (householdQueryResult.id) {
        householdId = householdQueryResult.id;
      } else {
        householdId = (
          await db.one(
            "INSERT INTO ho_dan (ma, id_thon_ban_tdp)\
            VALUES ($1, $2) RETURNING id;",
            [householdCode, villageId]
          )
        ).id;
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
        res.status(200).json({ message: "Khai báo thông tin thành công!" });
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
    // const { username } = req.user;
    const { villageId } = req.params;
    try {
      // const codeLength = username.length;
      const result = await db.any(
        "SELECT id, SUBSTRING(ma, 9) ma_ho_dan FROM ho_dan\
        WHERE id_thon_ban_tdp = $1;",
        [villageId]
        // [codeLength, username]
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
        "SELECT * FROM ca_nhan WHERE id_ho_dan = $1;",
        [householdId]
      );

      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  superviseProgress: async (req, res) => {},
  completeCensus: async (req, res) => {},
};
