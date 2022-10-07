const express = require("express");
const router = express.Router();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/term', router);

  // if the request has params, extract termId and check if term exists in db
  router.param('termId', async (req, res, next, termId) => {
    try {
      const term = await TermsServiceInstance.getTermById(termId);

      if (term) {
        req.termId = termId;
        req.term = term;
      }

      next();

    } catch(err) {
      next(err);
    }
  });

  // get term by id
  router.get('/:termId', async (req, res, next) => {
    console.log("######################");
    console.log("Vocabulary GET Term request");

    const term = req.term;
    return res.send({ term });
  });

  // update term
  router.put('/:termId', async (req, res, next) => {
    console.log("######################");
    console.log("Vocabulary UPDATE Term request");

    const { content, definition } = req.body;
    try {
      const term = await TermsServiceInstance.updateTerm({
        termId: req.termId,
        content,
        definition
      });
      console.log("Term updated. Returning infos...");

      return res.send({ term });

    } catch(err) {
      next(err);
    }
  });

  // delete term
  router.delete('/:termId', async (req, res, next) => {
    console.log("######################");
    console.log("Vocabulary DELETE Term request");

    try {
      await TermsServiceInstance.deleteTerm(req.termId);
      console.log("Term deleted");

      return res.status(204).send({ id });

    } catch(err) {
      next(err);
    }
  });

}
