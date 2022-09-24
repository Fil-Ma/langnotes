const { pool } = require("../database");

module.exports = class UserQueries {

  // add user to db
  async create(userData) {
    console.log("DATABASE querying --# User INSERT function called");

    try {
      console.log("DATABASE querying --# Querying DB for user insertion...");
      const id = 1;

      const result = await pool.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *', [id, userData.email, userData.password]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# User created");
        return result.rows[0];
      }

      console.log("DATABASE querying --# User not created");
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
      console.log(`DATABASE querying --# Executing query, finding user by email = ${email}`);
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# User found");
        return result.rows[0];
      }

      console.log("DATABASE querying --# User does not exist");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by id (if exists)
  async findOneById(id) {
    try {
      const result = await pool.query('SELECT * FORM users WHERE id = $1', [id]);

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
