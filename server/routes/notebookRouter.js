const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();

const NotebookService = require("../services/notebookService");
const NotebookServiceInstance = new NotebookService();

const VocabularyService = require("../services/vocabularyService");
const VocabularyServiceInstance = new VocabularyService();

module.exports = (app) => {

  app.use('/api/notebook', router);

  // POST route to add new notebook
  router.post('/add', async (req, res, next) => {

    console.log("######################");
    console.log("Notebook Add POST request");

    const { id } = req.user;
    const { name, language, description } = req.body;

    try {
      const newNotebook = await NotebookServiceInstance.addNotebook({
        userId: id,
        name,
        language,
        description
      });
      console.log("Notebook Added");

      const newVocabulary = await VocabularyServiceInstance.create({
        notebookId: newNotebook.id,
        language,
      });
      console.log("Vocabulary created");

      console.log("Sending response 201 to client");
      return res.status(201).send({
        notebook: newNotebook,
        vocabulary: newVocabulary
      });

    } catch(err) {
      next(err);
    }
  });


}
