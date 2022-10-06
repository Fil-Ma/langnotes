const express = require("express");
// const { check, validationResult } = require("express-validator");
const router = express.Router();

const LessonService = require("../services/LessonService");
const LessonServiceInstance = new LessonService();

module.exports = (app) => {

  app.use('/api/lesson', router);

  // load all lessons for a notebook by id (notebookId)
  router.get('/notebook/:notebookId', async (req, res, next) => {

    console.log("######################");
    console.log("Lesson GET request for all lessons in notebook");

    const { notebookId } = req.params;

    try {
      const lessons = await LessonServiceInstance.getAllLessons(notebookId);
      console.log("Loaded lessons");

      console.log("Sending data to the user")
      return res.status(200).send({ lessons });

    } catch(err) {
      next(err);
    }
  });

  // Add new lesson
  router.post('/new', async (req, res, next) => {

    console.log("######################");
    console.log("Lesson GET request for all lessons in notebook");

    const { title, description, content, notebookId } = req.body;
    try {
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
  });

  // Get lesson by id
  router.get('/:id', async (req, res, next) => {

    console.log("######################");
    console.log("Lesson GET request for single lesson id");

    const { id } = req.params;

    try {
      const lesson = await LessonServiceInstance.loadLessonById(id);

      return res.status(200).send({ lesson });

    } catch (err) {
      next(err);
    }
  });

  // Get lesson by id
  router.put('/', async (req, res, next) => {
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
  router.delete('/:id', async (req, res, next) => {

    const { id } = req.params;

    try {
      await LessonServiceInstance.deleteLesson(id);

      return res.status(200).send({ id });

    } catch (err) {
      next(err);
    }
  });

}
