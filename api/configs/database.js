const { dbCredentials } = require('./keys');

const pgp = require('pg-promise')({
  capSQL: true,
  query(q) {
    console.log(q.query);
  }
});

const db = pgp({
  ...dbCredentials,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  db, pgp
};