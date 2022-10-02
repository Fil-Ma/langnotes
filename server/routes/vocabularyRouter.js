const express = require("express");
const router = express.Router();

const VocabularyService = require("../services/vocabularyService");
const VocabularyServiceInstance = new VocabularyService();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/vocabulary', router);

  router.get('/:notebookId', async (req, res, next) => {
    const { notebookId } = req.params;

    try {
      const vocabulary = await VocabularyServiceInstance.loadVocabulary(notebookId);

      const terms = await TermsServiceInstance.loadAllTerms(vocabulary.id);

      return res.status(200).send({
        vocabulary,
        terms
      });

    } catch(err) {
      next(err);
    }
  });

  router.post('/add', async (req, res, next) => {
    const { data } = req.body;

    try {
      const newTerm = await VocabularyServiceInstance.addNewTerm(data);

      return res.status(201).send({ newTerm });

    } catch(err) {
      next(err);
    }
  });
}
