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
  },
  GOOGLE: {
    CONSUMER_KEY: process.env.GOOGLE_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.GOOGLE_CONSUMER_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
  },
  FACEBOOK: {
    CONSUMER_KEY: process.env.FACEBOOK_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.FACEBOOK_CONSUMER_SECRET,
    CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL
  }
}
