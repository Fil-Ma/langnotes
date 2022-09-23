require("dotenv").config();

module.exports = {
  PORT: process.env.SERVER_PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB: {
    PGHOST: process.env.DB_HOST,
    PGPORT: process.env.DB_PORT,
    PGUSERNAME: process.env.DB_USERNAME,
    PGPASSWORD: process.env.DB_PASSWORD,
    PGDATABASE: process.env.DB_DATABASE_NAME
  }
}
