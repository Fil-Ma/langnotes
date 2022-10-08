const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class TermsQueries {

  /**
   * Retrieves from db all terms assigned to a vocabulary.
   * @async
   * @method
   * @param   {Uuid}  vocabularyId  [vocabulary id]
   * @returns {Array}               [Array of terms objects]
   * @throws  {newError}            [When the query to the db generates errors.]
   */
  async getTermsByVocabularyId(vocabularyId) {
    try {
      const result = await pool.query('SELECT * FROM terms WHERE vocabulary_id = $1', [vocabularyId]);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves from db a single term by id.
   * @async
   * @method
   * @param   {Uuid}        termId    [term id]
   * @returns {Object|null}           [Term in the db]
   * @throws  {newError}              [When the query to the db generates errors.]
   */
  async getById(termId) {
    try {
      const result = await pool.query('SELECT * FROM terms WHERE id = $1', [termId]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Adds new term to db.
   * @async
   * @method
   * @param   {Object}    data    [Term data]
   * @returns {Object}            [Term created data]
   * @throws  {newError}          [When the query to the db generates errors.]
   */
  async addTerm(data) {
    const { vocabularyId, content, definition } = data;
    const id = uuidv4();

    try {
      const result = await pool.query('INSERT INTO terms (id, vocabulary_id, content, definition) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, vocabularyId, content, definition]
      );
      
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates in db a single term by id.
   * @async
   * @method
   * @param   {Object}      data    [Term data]
   * @returns {Object}              [Updated term]
   * @throws  {newError}            [When the query to the db generates errors.]
   */
  async update(data) {
    const { termId, content, definition } = data;

    try {
      const result = await pool.query('UPDATE terms SET content = $1, definition = $2 WHERE id = $3 RETURNING *',
        [content, definition, termId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Deletes from db a single term by id.
   * @async
   * @method
   * @param   {Uuid}        termId    [Term id]
   * @throws  {newError}              [When the query to the db generates errors.]
   */
  async delete(termId) {
    try {
      await pool.query('DELETE FROM terms WHERE id = $1', [termId]);
      return;

    } catch(err) {
      throw new Error(err);
    }
  }

}
