"use strict";

const { Pool } = require("pg");
const { DB } = require("../config");

module.exports = new Pool({
  user: DB.PGUSERNAME,
  host: DB.PGHOST,
  port: DB.PGPORT,
  password: DB.PGPASSWORD,
  database: DB.PGDATABASE
});

// module.exports = {
//   pool: pool
// }
