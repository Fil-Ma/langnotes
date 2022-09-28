const { pool } = require("../database");

module.exports = class NotebookQueries {

  async findAllByUserId(userId) {

    console.log("DATABASE querying --# Notebook SELECT function called");

    try {
      console.log("DATABASE querying --# Notebook finding all notebooks owned by the user");
      const result = await pool.query('SELECT id, name, language FROM notebooks WHERE user_id = $1', [userId]);
      console.log(result);

      if (result.rows?.length) {
        console.log("DATABASE querying --# Notebooks found returning");
        return result.rows;
      }

      console.log("DATABASE querying --# The user does not have any notebook");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
