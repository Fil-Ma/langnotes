const createError = require("http-errors");

const TermsQueries = require("../queries/terms");
const TermsQueriesInstance = new TermsQueries();

module.exports = class TermsService {

  async loadAllTerms(vocabularyId) {

    console.log("TermsService --# Called LOAD terms by vocabulary id");
    try {
      console.log("TermsService --# Querying db for terms");
      const terms = await TermsQueriesInstance.loadTermsByVocabularyId(vocabularyId);

      if (!terms) {
        console.log("TermsService --# Vocabulary is empty");
        return [];
      }

      console.log("TermsService --# Loaded terms, returning...");
      return terms;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
