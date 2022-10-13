const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class UserQueries {

  // add user to db
  async create(userData) {
    try {
      const userId = uuidv4();
      let result = [];

      if (userData.google) {
        const { id, displayName, email } = userData.google;

        result = await pool.query('INSERT INTO users (id, google, email) VALUES ($1, $2, $3) RETURNING *',
          [userId, { id, displayName }, email]
        );

      } else if (userData.facebook) {

        result = await pool.query('INSERT INTO users (id, facebook) VALUES ($1, $2) RETURNING *', [userId, userData.facebook]);

      } else if (userData.email && userData.password) {

        result = await pool.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *', [userId, userData.email, userData.password]);

      }

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // update user info
  async update(userData) {
    try {
      const { id, ...params } = userData;

      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by email (if exists)
  async findOneByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by id (if exists)
  async findOneById(id) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by google id
  async findOneByGoogleId(id) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE google ->> 'id' = $1`, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by facebook id
  async findOneByFacebookId(id) {
    try {
      const result = await pool.query(`SELECT * FROM users WHERE facebook ->> 'id' = $1`, [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
