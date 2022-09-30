const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();

const LessonService = require("../services/LessonService");
const LessonServiceInstance = new LessonService();

module.exports = (app) => {

  app.use('/api/lesson', router);

  // load all lessons for a notebook by id (notebookId)
  router.get('/notebook/:id', async (id, req, res, next) => {
    try {
      const lessons = await LessonServiceInstance.getAllLessons(id);

      return res.status(200).send({ lessons });

    } catch(err) {
      next(err);
    }
  });

  // Add new lesson
  router.post('/new', async (req, res, next) => {
    const { data } = req.body;
    try {
      const lesson = await LessonServiceInstance.addNewLesson(data);

      return res.status(201).send({ lesson });

    } catch(err) {
      next(err);
    }
  });

  // Get lesson by id
  router.get('/:id', async (id, req, res, next) => {
    try {
      const lesson = await LessonServiceInstance.loadLessonById(id);

      return res.status(200).send({ lesson });

    } catch (err) {
      next(err);
    }
  });

  // Get lesson by id
  router.update('/', async (req, res, next) => {
    const { id, title, description, content, notebookId } = req.body;
    try {
      const lesson = await LessonServiceInstance.updateLesson({
        id,
        title,
        description,
        content,
        notebookId
      });

      return res.status(201).send({ lesson });

    } catch (err) {
      next(err);
    }
  });

  // Get lesson by id
  router.delete('/:id', async (id, req, res, next) => {
    try {
      await LessonServiceInstance.deleteLesson(id);

      return res.status(200).send();

    } catch (err) {
      next(err);
    }
  });

}
