const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class NotebookQueries {

  async findAllByUserId(userId) {

    // console.log("DATABASE querying --# Notebook SELECT function called");

    try {
      // console.log("DATABASE querying --# Notebook finding all notebooks owned by the user");
      const result = await pool.query('SELECT id, name, language FROM notebooks WHERE user_id = $1', [userId]);
      // console.log(result.rows);

      if (result.rows?.length) {
        // console.log("DATABASE querying --# Notebooks found returning");
        return result.rows;
      }

      // console.log("DATABASE querying --# The user does not have any notebook");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  async createNotebook(data) {

    console.log("DATABASE querying --# Notebook INSERT function called");

    const { name, language, userId, description } = data;

    try {
      const id = uuidv4();

      console.log("DATABASE querying --# Querying db to add a new notebook");
      const result = await pool.query('INSERT INTO notebooks (id, name, language, user_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, language, userId, description]
      );

      console.log("DATABASE querying --# Returning new notebook data");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

}
