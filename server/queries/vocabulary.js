const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class VocabularyQueries {

  async createVocabulary(data) {
    console.log("DATABASE querying --# Vocabulary INSERT function called");
    const { notebookId, language } = data;

    const id = uuidv4();

    try {
      console.log("DATABASE querying --# Querying db for insertion");
      const result = await pool.query('INSERT INTO vocabularies (id, notebook_id, language) VALUES ($1, $2, $3) RETURNING *',
        [id, notebookId, language]
      );

      console.log("DATABASE querying --# Vocabuary added, returning infos...");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

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

  async createTerm(data) {
    const { vocabularyId, content, definition } = data;

    const id = uuidv4();

    try {
      const result = await pool.query('INSERT INTO terms (id, vocabulary_id, content, definition) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, vocabularyId, content, definition]
      );

      return result.rows[0];

    } catch (err) {
      throw new Error(err);
    }
  }
}
