const createError = require("http-errors");
const he = require("he");

const TermsQueries = require("../queries/terms");
const TermsQueriesInstance = new TermsQueries();

module.exports = class TermsService {

  // load all terms by vocabulary id
  async loadAllTermsByVocabularyId(vocabularyId) {
    try {
      const terms = await TermsQueriesInstance.getTermsByVocabularyId(vocabularyId);

      if (!terms) {
        return [];
      }

      return terms.map(term => {
        return {
          vocabularyId: term.vocabulary_id,
          id: term.id,
          content: he.decode(term.content),
          definition: he.decode(term.definition)
        };
      });

    } catch(err) {
      throw createError(500, err);
    }
  }

  // add new term to db
  async addNewTerm(data) {
    try {
      const term = await TermsQueriesInstance.addTerm(data);

      return {
        vocabularyId: term.vocabulary_id,
        id: term.id,
        content: he.decode(term.content),
        definition: he.decode(term.definition)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // get single term by term id
  async getTermById(termId) {

    try {
      const term = await TermsQueriesInstance.getById(termId);

      return {
        vocabularyId: term.vocabulary_id,
        id: term.id,
        content: he.decode(term.content),
        definition: he.decode(term.definition)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // update single term by id
  async updateTerm(data) {
    try {
      const term = await TermsQueriesInstance.update(data);

      return {
        vocabularyId: term.vocabulary_id,
        id: term.id,
        content: he.decode(term.content),
        definition: he.decode(term.definition)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // delete single term by id
  async deleteTerm(termId) {
    try {
      await TermsQueriesInstance.delete(termId);

      return;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
