const createError = require("http-errors");

const TermsQueries = require("../queries/terms");
const TermsQueriesInstance = new TermsQueries();

module.exports = class TermsService {

  async loadAllTerms(vocabularyId) {
    try {
      const terms = await TermsQueriesInstance.loadTermsByVocabularyId(vocabularyId);

      if (!terms) {
        return [];
      }
      
      return terms;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
