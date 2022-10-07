const express = require("express");
const router = express.Router();

const TermsService = require("../../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/term', router);

  router.put('/', async (req, res, next) => {
    console.log("######################");
    console.log("Vocabulary UPDATE Term request");

    const data = req.body;
    try {
      const term = await TermsServiceInstance.updateTerm(data);
      console.log("Term updated. Returning infos...");

      return res.status(200).send({
        term
      });

    } catch(err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    console.log("######################");
    console.log("Vocabulary DELETE Term request");

    const { id } = req.params;
    try {
      await TermsServiceInstance.deleteTerm(id);
      console.log("Term deleted");

      return res.status(200).send({ id });

    } catch(err) {
      next(err);
    }
  });

}
