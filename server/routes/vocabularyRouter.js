const express = require("express");
const router = express.Router();

const VocabularyService = require("../services/vocabularyService");
const VocabularyServiceInstance = new VocabularyService();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/vocabulary', router);

  router.get('/:notebookId', async (req, res, next) => {

    console.log("######################");
    console.log("Vocabulary request to load all data");

    const { notebookId } = req.params;

    try {
      const vocabulary = await VocabularyServiceInstance.loadVocabulary(notebookId);
      console.log("Loaded vocabulary data");

      const terms = await TermsServiceInstance.loadAllTerms(vocabulary.id);
      console.log("Loaded vocabulary terms");

      console.log("Sending data to the user");
      return res.status(200).send({
        vocabulary,
        terms
      });

    } catch(err) {
      next(err);
    }
  });

  router.post('/add', async (req, res, next) => {

    console.log("######################");
    console.log("Vocabulary Add Term request");

    const data = req.body;

    try {
      const newTerm = await VocabularyServiceInstance.addNewTerm(data);
      console.log("Added successfully the new term");

      return res.status(201).send({
        term: newTerm
      });

    } catch(err) {
      next(err);
    }
  });
}
