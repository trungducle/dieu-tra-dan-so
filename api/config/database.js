const { DB_CREDENTIALS } = require("./keys");

const pgp = require("pg-promise")({
  capSQL: true,
  query(q) {
    console.log(q.query);
  },
});

const db = pgp({
  ...DB_CREDENTIALS,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { pgp, db };
