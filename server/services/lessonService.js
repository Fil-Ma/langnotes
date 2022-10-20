const createError = require("http-errors");
const he = require("he");

const LessonQueries = require("../queries/lessons");
const LessonQueriesInstance = new LessonQueries();

module.exports = class LessonService {

  // Load all lessons assigned to a specific notebook (by notebook id)
  async getAllLessons(notebookId) {
    try {
      const lessons = await LessonQueriesInstance.getLessonsByNotebookId(notebookId);

      if (!lessons) {
        return [];
      }

      return lessons.map((lesson) => {
        return {
          id: lesson.id,
          title: he.decode(lesson.title),
          content: he.decode(lesson.content),
          description: he.decode(lesson.description),
          notebookId: lesson.notebook_id
        }
      });

    } catch(err) {
      throw createError(500, err);
    }
  }

  // Add a new lesson
  async addNewLesson(data) {
    try {
      const lesson = await LessonQueriesInstance.createLesson(data);

      return {
        id: lesson.id,
        title: he.decode(lesson.title),
        content: he.decode(lesson.content),
        description: he.decode(lesson.description),
        notebookId: lesson.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // Load a specific lesson by id
  async getLessonById(lessonId) {
    try {
      const lesson = await LessonQueriesInstance.getLessonById(lessonId);

      if (!lesson) {
        throw createError(404, "Lesson not found");
      }

      return {
        id: lesson.id,
        title: he.decode(lesson.title),
        content: he.decode(lesson.content),
        description: he.decode(lesson.description),
        notebookId: lesson.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // update lesson data
  async updateLesson(data) {
    try {
      const lesson = await LessonQueriesInstance.update(data);

      return {
        id: lesson.id,
        title: he.decode(lesson.title),
        content: he.decode(lesson.content),
        description: he.decode(lesson.description),
        notebookId: lesson.notebook_id
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // delete lesson by id
  async deleteLesson(lessonId) {
    try {
      await LessonQueriesInstance.deleteLessonById(lessonId);

      return;

    } catch(err) {
      throw createError(500, err);
    }
  }
}
