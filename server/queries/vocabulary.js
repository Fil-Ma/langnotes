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

      console.log("DATABASE querying --# Vocabulary added, returning infos...");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  async getVocabularyByNotebookId(notebookId) {
    console.log("DATABASE querying --# Vocabulary LOAD DATA function");

    try {
      console.log("DATABASE querying --# Querying db for info retrieval");
      const result = await pool.query('SELECT * FROM vocabularies WHERE notebook_id = $1',
        [notebookId]
      );

      console.log("DATABASE querying --# Returning...");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

}
