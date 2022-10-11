const createError = require("http-errors");

const VocabularyQueries = require("../queries/vocabulary");
const VocabularyQueriesInstance = new VocabularyQueries();

module.exports = class VocabularyService {

  // creates a new vocabulary
  async create(data) {
    try {
      const newVocabulary = await VocabularyQueriesInstance.createVocabulary(data);

      return {
        id: newVocabulary.id,
        language: newVocabulary.language,
        notebookId: newVocabulary.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // loads vocabulary informations
  async loadVocabulary(notebookId) {
    try {
      const vocabulary = await VocabularyQueriesInstance.getVocabularyByNotebookId(notebookId);

      return {
        id: vocabulary.id,
        language: vocabulary.language,
        notebookId: vocabulary.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // updates vocabulary data
  async updateVocabulary(data) {
    const { vocabularyId, language, notebookId } = data;

    try {
      const vocabulary = await VocabularyQueriesInstance.updateData({
        vocabularyId,
        language,
        notebookId
      });

      return {
        id: vocabulary.id,
        language: vocabulary.language,
        notebookId: vocabulary.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // deletes vocabulary from db
  async deleteVocabulary(vocabularyId) {
    try {
      await VocabularyQueriesInstance.delete(vocabularyId);

      return;

    } catch(err) {
      throw createError(500, err);
    }
  }

}
