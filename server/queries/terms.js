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
}
