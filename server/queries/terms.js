const { pool } = require("../database");

module.exports = class TermsQueries {

  async loadTermsByVocabularyId(vocabularyId) {
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

  async update(data) {
    console.log("DATABASE querying --# Terms UPDATE function called");

    const { termId, content, definition } = data;
    try {
      console.log("DATABASE querying --# Querying db for term update");
      const result = await pool.query('UPDATE terms SET content = $1, definition = $2 WHERE id = $3 RETURNING *',
        [content, definition, termId]
      );

      console.log("DATABASE querying --# Term updated. Returning...");
      return;

    } catch(err) {
      throw new Error(err);
    }
  }

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
