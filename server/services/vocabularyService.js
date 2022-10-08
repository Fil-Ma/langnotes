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

    console.log("VocabularyService --# Called LOAD vocabulary service");
    try {
      console.log("VocabularyService --# Querying db for vocabulary by notebook id");
      const vocabulary = await VocabularyQueriesInstance.getVocabularyByNotebookId(notebookId);

      console.log("VocabularyService --# Loaded Vocabulary data, returning...");
      return vocabulary;

    } catch(err) {
      throw createError(500, err);
    }
  }

}
