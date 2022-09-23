const db = require("../database");

module.exports = class UserQueries {

  // add user to db
  async create(userData) {
    try {
      const id = 1;

      const result = await db.query('INSERT INTO users (id, email, password) VALUES ($id, $username, $password) RETURNING *',
      {
        $id: id,
        $username: userData.email,
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

      const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);

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
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

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
      const result = await db.query('SELECT * FORM users WHERE id = $1', [id]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // for the future
  // manage login with google
  //manage login with facebook


}
