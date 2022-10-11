const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const NotebookService = require("../services/notebookService");
const NotebookServiceInstance = new NotebookService();

const VocabularyService = require("../services/vocabularyService");
const VocabularyServiceInstance = new VocabularyService();

module.exports = (app) => {

  app.use('/api/notebook', router);

  // POST route to add new notebook
  router.post('/',
    [
      body('name').notEmpty().trim().escape(),
      body('language').notEmpty().trim().escape(),
      body('description').notEmpty().trim().escape(),
    ],
    async (req, res, next) => {
      const { id } = req.user;
      const { name, language, description } = req.body;

      try {
        const newNotebook = await NotebookServiceInstance.addNotebook({
          userId: id,
          name,
          language,
          description
        });

        const newVocabulary = await VocabularyServiceInstance.create({
          notebookId: newNotebook.id,
          language
        });

        return res.status(201).send({
          notebook: newNotebook,
          vocabulary: newVocabulary
        });

      } catch(err) {
        next(err);
      }
  });


}
