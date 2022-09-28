const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class UserQueries {

  // add user to db
  async create(userData) {
    console.log("DATABASE querying --# User INSERT function called");

    try {
      const id = uuidv4();

      if (userData.google) {

        console.log("DATABASE querying --# Querying DB for user insertion with google...");
        const result = await pool.query('INSERT INTO users (id, google) VALUES ($1, $2) RETURNING *', [id, userData.google]);

      } else if (userData.facebook) {

        console.log("DATABASE querying --# Querying DB for user insertion with facebook...");
        const result = await pool.query('INSERT INTO users (id, facebook) VALUES ($1, $2) RETURNING *', [id, userData.facebook]);

      } else if (userData.email && userData.password) {

        console.log("DATABASE querying --# Querying DB for user insertion...");
        const result = await pool.query('INSERT INTO users (id, email, password) VALUES ($1, $2, $3) RETURNING *', [id, userData.email, userData.password]);

      }

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
    console.log("DATABASE querying --# User update info request");

    try {
      console.log("DATABASE querying --# Querying DB for user data...");
      const { id, ...params } = userData;

      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# Retrieving user info");
        return result.rows[0];
      }

      console.log("DATABASE querying --# User not found");
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
      console.log(`DATABASE querying --# Executing query, finding user by id = ${id}`);
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

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

  // find user by google id
  async findOneByGoogleId(id) {

    console.log(`DATABASE querying --# Executing query, finding user by google id = ${id}`);
    try {
      const result = await db.query(`SELECT * FROM users WHERE google ->> 'id' = $1`, [id]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# User found");
        return result.rows[0];
      }

      console.log("DATABASE querying --# User found");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // find user by facebook id
  async findOneByFacebookId(id) {

    console.log(`DATABASE querying --# Executing query, finding user by facebook id = ${id}`);
    try {
      const result = await db.query(`SELECT * FROM users WHERE facebook ->> 'id' = $1`, [id]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# User found");
        return result.rows[0];
      }

      console.log("DATABASE querying --# User found");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
