const createError = require("http-errors");

const LessonQueries = require("../queries/lesson");
const LessonQueriesInstance = new LessonQueries();

module.exports = class LessonService {

  async getAllLessons(notebookId) {

    try {
      const lessons = await LessonQueriesInstance.getLessonsByNotebookId(notebookId);

      if (!lessons) {
        throw createError(404, "No lesson present");
      }

      return lessons;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async addNewLesson(data) {
    try {
      const lesson = await LessonQueriesInstance.createLesson(data);

      return lesson;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async loadLessonById(lessonId) {
    try {
      const lesson = await LessonQueriesInstance.getLessonById(lessonId);

      if (!lesson) {
        throw createError(404, "Lesson not found");
      }

      return lesson;

    } catch(err) {
      throw createError(500, err);
    }
  }

  async updateLesson(data) {
    try {
      const lesson = await LessonQueriesInstance.update(data);

      return lesson;
      
    } catch(err) {
      throw createError(500, err);
    }
  }

  async deleteLesson(lessonId) {
    try {
      await LessonQueriesInstance.deleteLessonById(lessonId);

      return;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
