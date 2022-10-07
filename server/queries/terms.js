const { pool } = require("../database");

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
    console.log("DATABASE querying --# Terms LOAD function called");

    try {
      console.log("DATABASE querying --# Querying db for terms selection");
      const result = await pool.query('SELECT * FROM terms WHERE vocabulary_id = $1', [vocabularyId]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# Terms loaded, returning...");
        return result.rows;
      }

      console.log("DATABASE querying --# The vocabulary is empty, returning...");
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
    console.log("DATABASE querying --# Terms GET BY ID function called");
    try {
      const result = await pool.query('SELECT * FROM terms WHERE id = $1', [termId]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# Term found, returning infos...");
        return result.rows[0];
      }

      console.log("DATABASE querying --# Term not found");
      return null;

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
    console.log("DATABASE querying --# Terms UPDATE function called");
    const { termId, content, definition } = data;
    
    try {
      console.log("DATABASE querying --# Querying db for term update");
      const result = await pool.query('UPDATE terms SET content = $1, definition = $2 WHERE id = $3 RETURNING *',
        [content, definition, termId]
      );

      console.log("DATABASE querying --# Term updated. Returning...");
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
    console.log("DATABASE querying --# Terms DELETE function called");

    try {
      console.log("DATABASE querying --# Querying db for term delete");
      await pool.query('DELETE FROM terms WHERE id = $1', [termId]);

      console.log("DATABASE querying --# Term deleted. Returning...");
      return;

    } catch(err) {
      throw new Error(err);
    }
  }

}
