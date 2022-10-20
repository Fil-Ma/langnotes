const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();

const LessonService = require("../services/LessonService");
const LessonServiceInstance = new LessonService();

module.exports = (app) => {

  app.use('/api/lessons', router);

  // load all lessons for a notebook by id (notebookId)
  router.get('/notebook/:notebookId',
    [
      param('notebookId').isUUID(4)
    ],
    async (req, res, next) => {
      const { notebookId } = req.params;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const lessons = await LessonServiceInstance.getAllLessons(notebookId);

        return res.status(200).send({ lessons });

      } catch(err) {
        next(err);
      }
  });

  // if is present the lesson id param, extract it
  router.use('/:lessonId',
    param('lessonId', 'Lesson id must be uuid type').isUUID(4),
    async (req, res, next) => {
      const { lessonId } = req.params;

      try {
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const lesson = await LessonServiceInstance.getLessonById(lessonId);

        if (lesson) {
          req.lessonId = lessonId;
          req.lesson = lesson;
        }

        next();

      } catch(err) {
        next(err);
      }
    }
  );

  // Get lesson by id
  router.get('/:lessonId', async (req, res, next) => {
    return res.send({
      lesson: req.lesson
    });
  });

  // Add new lesson
  router.post('/',
    [
      body('title').notEmpty().trim().escape(),
      body('description').notEmpty().trim().escape(),
      body('content').notEmpty().trim().escape(),
      body('notebookId').isUUID(4)
    ],
    async (req, res, next) => {
      const { title, description, content, notebookId } = req.body;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const lesson = await LessonServiceInstance.addNewLesson({
          title,
          description,
          content,
          notebookId
        });

        return res.status(201).send({ lesson });

      } catch(err) {
        next(err);
      }
    }
  );

  // Update lesson
  router.put('/:lessonId',
    [
      body('title').notEmpty().trim().escape(),
      body('description').notEmpty().trim().escape(),
      body('content').notEmpty().trim().escape(),
      body('notebookId').isUUID(4)
    ],
    async (req, res, next) => {
      const { title, description, content, notebookId } = req.body;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const lesson = await LessonServiceInstance.updateLesson({
          lessonId: req.lessonId,
          title,
          description,
          content,
          notebookId
        });

        return res.send({ lesson });

      } catch (err) {
        next(err);
      }
    }
  );

  // Get lesson by id
  router.delete('/:lessonId', async (req, res, next) => {
    try {
      const lessonId = req.lessonId;

      await LessonServiceInstance.deleteLesson(lessonId);

      return res.send({
        id: lessonId
      });

    } catch (err) {
      next(err);
    }
  });

}
