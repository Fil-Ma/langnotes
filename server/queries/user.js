const pool = require("../database");

module.exports = class UserQueries {

  // add user to db
  async create(userData) {
    try {
      const result = await pool.query('INSERT INTO users (email, password) VALUES ($username, $password) RETURNING *',
      {
        $username: userData.username,
        $password: userData.password
      });

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


}
