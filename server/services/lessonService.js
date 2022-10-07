const createError = require("http-errors");

const LessonQueries = require("../queries/lesson");
const LessonQueriesInstance = new LessonQueries();

module.exports = class LessonService {

  // Load all lessons assigned to a specific notebook (by notebook id)
  async getAllLessons(notebookId) {

    console.log("LessonService --# Called GET all lessons service");
    try {
      console.log("LessonService --# Querying db for data");
      const lessons = await LessonQueriesInstance.getLessonsByNotebookId(notebookId);

      if (!lessons) {
        console.log("LessonService --# There are no lessons. Returning...");
        return [];
      }

      console.log("LessonService --# Returning lesson data");
      return lessons;

    } catch(err) {
      throw createError(500, err);
    }
  }

  // Add a new lesson
  async addNewLesson(data) {
    console.log("LessonService --# Called ADD lesson service");
    try {
      console.log("LessonService --# Querying db for data");
      const lesson = await LessonQueriesInstance.createLesson(data);

      console.log("LessonService --# Lesson added. Returning data...");
      return lesson;

    } catch(err) {
      throw createError(500, err);
    }
  }

  // Load a specific lesson by id
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
    console.log("LessonService --# Called UPDATE lesson service");
    try {
      console.log("LessonService --# Querying db for data");
      const lesson = await LessonQueriesInstance.update(data);

      console.log("LessonService --# Lesson updated. Returning data...");
      return {
        id: lesson.id,
        title: lesson.title,
        content: lesson.content,
        description: lesson.description,
        notebookId: lesson.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  async deleteLesson(lessonId) {
    console.log("LessonService --# Called DELETE lesson service");
    try {
      console.log("LessonService --# Querying db for data");
      await LessonQueriesInstance.deleteLessonById(lessonId);

      console.log("LessonService --# Lesson deleted. Returning...");
      return;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
