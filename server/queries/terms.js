const { pool } = require("../database");

module.exports = class TermsQueries {

  async loadTermsByVocabularyId(vocabularyId) {
    try {
      const result = await pool.query('SELECT * FROM terms WHERE id = $1', [vocabularyId]);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }
}
