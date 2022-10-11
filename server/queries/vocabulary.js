const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class VocabularyQueries {

  /**
   * Adds a vocabulary to database.
   * @async
   * @method
   * @param   {Object}    data  [vocabulary data]
   * @returns {Object}          [Created vocabulary]
   * @throws  {newError}        [When the query to the db generates errors.]
   */
  async createVocabulary(data) {
    const { notebookId, language } = data;
    const id = uuidv4();

    try {
      const result = await pool.query('INSERT INTO vocabularies (id, notebook_id, language) VALUES ($1, $2, $3) RETURNING *',
        [id, notebookId, language]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves vocabulary assigned to specific notebook (by id).
   * @async
   * @method
   * @param   {UUID}      notebookId  [notebook id]
   * @returns {Object}                [vocabulary data]
   * @throws  {newError}              [When the query to the db generates errors.]
   */
  async getVocabularyByNotebookId(notebookId) {
    try {
      const result = await pool.query('SELECT * FROM vocabularies WHERE notebook_id = $1',
        [notebookId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates vocabulary informations.
   * @async
   * @method
   * @param   {Object}     data   [vocabulary data]
   * @returns {Object}            [vocabulary updated data]
   * @throws  {newError}          [When the query to the db generates errors.]
   */
  async updateData(data) {
    const { vocabularyId, language } = data;

    try {
      const result = await pool.query('UPDATE vocabularies SET language = $1 WHERE vocabulary_id = $2 RETURNING *',
        [language, vocabularyId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes vocabulary from DB
   * @async
   * @method
   * @param   {UUID}      vocabularyId  [vocabulary id]
   * @throws  {newError}                [When the query to the db generates errors.]
   */
  async delete(vocabularyId) {
    try {
      await pool.query('DELETE FROM vocabularies WHERE vocabulary_id = $1',
        [vocabularyId]
      );

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
