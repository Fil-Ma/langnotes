const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();

const TermsService = require("../services/termsService");
const TermsServiceInstance = new TermsService();

module.exports = (app) => {

  app.use('/api/terms', router);

  // if the request has params, extract termId
  router.use('/:termId',
    param('termId', 'Term id must be uuid type').isUUID(4),
    async (req, res, next) => {
      const { termId } = req.params;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const term = await TermsServiceInstance.getTermById(termId);

        if (term) {
          req.termId = termId;
          req.term = term;
        }

        next();

      } catch(err) {
        next(err);
      }
    }
  );

  // get term by id
  router.get('/:termId', async (req, res, next) => {
    return res.send({
      term: req.term
    });
  });

  // add new term
  router.post('/',
    [
      body('vocabularyId', 'Invalid vocabulary id').isUUID(4),
      body('content').notEmpty().trim().escape(),
      body('definition').notEmpty().trim().escape()
    ],
    async (req, res, next) => {
      const { vocabularyId, content, definition } = req.body;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

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
  router.put('/:termId',
    [
      body('vocabularyId', 'Invalid vocabulary id').isUUID(4),
      body('content').notEmpty().trim().escape(),
      body('definition').notEmpty().trim().escape()
    ],
    async (req, res, next) => {
      const { content, definition } = req.body;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

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
