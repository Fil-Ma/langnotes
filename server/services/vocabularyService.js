const createError = require("http-errors");

const VocabularyQueries = require("../queries/vocabulary");
const VocabularyQueriesInstance = new VocabularyQueries();

module.exports = class VocabularyService {

  async create(data) {

    console.log("VocabularyService --# Called INSERT vocabulary service");

    try {
      console.log("VocabularyService --# Querying db for vocabulary insertion");
      const newVocabulary = await VocabularyQueriesInstance.createVocabulary(data);

      console.log("VocabularyService --# Vocabulary created, retrieving infos...");
      return newVocabulary;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async loadVocabulary(notebookId) {
    try {
      const vocabulary = await VocabularyQueriesInstance.getVocabularyByNotebookId(notebookId);

      return vocabulary;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async addNewTerm(data) {
    try {
      const term = await VocabularyQueriesInstance.createTerm(data);

      return term;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
