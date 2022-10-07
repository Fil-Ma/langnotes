const createError = require("http-errors");

const TermsQueries = require("../queries/terms");
const TermsQueriesInstance = new TermsQueries();

module.exports = class TermsService {

  // load all terms by vocabulary id
  async loadAllTerms(vocabularyId) {

    console.log("TermsService --# Called LOAD terms by vocabulary id");
    try {
      console.log("TermsService --# Querying db for terms");
      const terms = await TermsQueriesInstance.getTermsByVocabularyId(vocabularyId);

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

  // get single term by term id
  async getTermById(termId) {
    console.log("TermsService --# Called GET term by id");

    try {
      console.log("TermsService --# Querying db");
      const term = await TermsQueriesInstance.getById(termId);

      return term;

    } catch(err) {
      throw createError(500, err);
    }
  }

  // update single term by id
  async updateTerm(data) {
    console.log("TermsService --# Called UPDATE term");
    try {
      console.log("TermsService --# Querying db for update");
      const term = await TermsQueriesInstance.update(data);

      console.log("TermsService --# Term updated. Returning...");
      return {
        id: term.id,
        content: term.content,
        definition: term.definition
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // delete single term by id
  async deleteTerm(termId) {
    console.log("TermsService --# Called DELETE term");
    try {
      console.log("TermsService --# Querying db for delete");
      await TermsQueriesInstance.delete(termId);

      console.log("TermsService --# Term deleted. Returning...");
      return;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
