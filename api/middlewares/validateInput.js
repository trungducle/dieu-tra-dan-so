const { db } = require("../config/database");

module.exports = {
  validateCensusData: async (req, res, next) => {
    const input = req.body;
    console.log(input);

    const identity = input["identity"];
    const ishead = input["is-head"];
    const household = input["household"];

    if (!identity.match("[0-9]+")) {
      return res
        .status(403)
        .json({ error: "Mã định danh chỉ được chứa ký tự số!" });
    }

    if (identity.length != 12) {
      return res.status(403).json({ error: "Mã định danh phải gồm 12 số!" });
    }

    const identityNotAvailable = (
      await db.one(
        "SELECT COUNT(*) so_luong FROM ca_nhan WHERE ma_dinh_danh = $1;",
        [identity]
      )
    ).so_luong;

    if (identityNotAvailable > 0) {
      return res.status(403).json({ error: "Mã định danh đã tồn tại!" });
    }

    if (ishead === "Có") {
      const hasHead = (
        await db.one(
          "SELECT COUNT(*) so_luong FROM ca_nhan WHERE id_ho_dan = $1 AND chu_ho = true;",
          [household]
        )
      ).so_luong;

      if (hasHead > 0) {
        return res
          .status(403)
          .json({ error: "Hộ gia đình đã tồn tại một chủ hộ!" });
      }
    }

    next();
  },
};
