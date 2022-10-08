const express = require("express");
const router = express.Router();

const VocabularyService = require("../services/vocabularyService");
const VocabularyServiceInstance = new VocabularyService();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/vocabulary', router);

  // get vocabulary by notebook id
  router.get('/:notebookId', async (req, res, next) => {
    const { notebookId } = req.params;

    try {
      // get vocabulary data
      const vocabulary = await VocabularyServiceInstance.loadVocabulary(notebookId);

      // get terms in vocabulary
      const terms = await TermsServiceInstance.loadAllTermsByVocabularyId(vocabulary.id);

      return res.status(200).send({
        vocabulary,
        terms
      });

    } catch(err) {
      next(err);
    }
  });

}
