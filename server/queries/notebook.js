const { pool } = require("../database");

module.exports = class NotebookQueries {

  async findAllByUserId(userId) {
    try {
      const result = await pool.query('SELECT id, name, language FROM notebooks WHERE userId = $1', [userId]);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
