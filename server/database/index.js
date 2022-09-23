"use strict";

const { Pool } = require("pg");
const { DB } = require("../config");

const pool = new Pool({
  user: DB.USERNAME,
  host: DB.HOST,
  port: DB.PORT,
  password: DB.PASSWORD,
  database: DB.DATABASE
});

module.exports = {
  pool: pool
}
