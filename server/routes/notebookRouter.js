const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();

const NotebookService = require("../services/notebookService");
const NotebookServiceInstance = new NotebookService();

module.exports = (app) => {

  app.use('/api/notebook', router);

  // POST route to add new notebook
  router.post('/add', async (req, res, next) => {

    console.log("######################");
    console.log("Notebook Add POST request");

    const { id } = req.user;
    const { name, language, description } = req.body;

    try {
      const response = await NotebookServiceInstance.addNotebook({
        userId: id,
        name,
        language,
        description
      });

      console.log("Notebook Added");
      return res.status(201).send({ response });

    } catch(err) {
      next(err);
    }
  });


}
