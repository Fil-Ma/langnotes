require("dotenv").config();

module.exports = {
  PORT: process.env.SERVER_PORT,
  SESSION_SECRET: process.env.SESSION_SECRET,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE_NAME
  }
}
