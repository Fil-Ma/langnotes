const express = require("express");
const router = express.Router();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/terms', router);

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

    const term = req.term;
    return res.send({ term });
  });

  // add new term
  router.post('/', async (req, res, next) => {
    const { vocabularyId, content, definition } = req.body;

    try {
      const term = await TermsServiceInstance.addNewTerm({
        vocabularyId,
        content,
        definition
      });

      return res.status(201).send({ term });

    } catch(err) {
      next(err);
    }
  });

  // update term
  router.put('/:termId', async (req, res, next) => {
    const { content, definition } = req.body;

    try {
      const term = await TermsServiceInstance.updateTerm({
        termId: req.termId,
        content,
        definition
      });

      return res.send({ term });

    } catch(err) {
      next(err);
    }
  });

  // delete term
  router.delete('/:termId', async (req, res, next) => {
    try {
      const id = req.termId;

      await TermsServiceInstance.deleteTerm(id);

      return res.send({ id });

    } catch(err) {
      next(err);
    }
  });

}
