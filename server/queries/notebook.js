const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class NotebookQueries {

  /**
   * get all notebooks assigned to a single user (by id).
   * @async
   * @method
   * @param   {UUID}      userId  [user id]
   * @returns {Array}             [Array of notebook objects]
   * @throws  {newError}          [When the query to the db generates errors.]
   */
  async findAllByUserId(userId) {
    try {
      const result = await pool.query('SELECT id, name, language FROM notebooks WHERE user_id = $1', [userId]);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Add notebook to the db.
   * @async
   * @method
   * @param   {Object}      data  [notebook data]
   * @returns {Object}            [notebook data added to the db]
   * @throws  {newError}          [When the query to the db generates errors.]
   */
  async createNotebook(data) {
    const { name, language, userId, description } = data;
    const id = uuidv4();

    try {
      const result = await pool.query('INSERT INTO notebooks (id, name, language, user_id, description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, language, userId, description]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Retrives all data of one notebook (by id).
   * @async
   * @method
   * @param   {UUID}      notebookId  [notebook id]
   * @returns {Object}                [notebook data]
   * @throws  {newError}              [When the query to the db generates errors.]
   */
  async getById(notebookId) {
    try {
      const result = await pool.query('SELECT * FROM notebooks WHERE id = $1',
        [notebookId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates notebook data.
   * @async
   * @method
   * @param   {Object}      data    [notebook data]
   * @returns {Object}              [notebook updated data]
   * @throws  {newError}            [When the query to the db generates errors.]
   */
  async update(data) {
    const { id, name, language, description } = data;

    try {
      const result = await pool.query('UPDATE notebooks SET name = $1, language = $2, description = $3 WHERE id = $4 RETURNING *',
        [name, language, description, id]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates notebook data.
   * @async
   * @method
   * @param   {UUID}      notebookId    [notebook id]
   * @throws  {newError}                [When the query to the db generates errors.]
   */
  async delete(notebookId) {
    try {
      await pool.query('DELETE FROM notebooks WHERE id = $1',
        [notebookId]
      );

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
