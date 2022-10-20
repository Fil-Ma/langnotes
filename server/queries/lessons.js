const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class LessonQueries {

  /**
   * Retrieves from db the lesson with assigned id.
   * @async
   * @method
   * @param   {UUID}        lessonId    [lesson id]
   * @returns {Object|null}             [Lesson object]
   * @throws  {newError}                [When the query to the db generates errors.]
   */
  async getLessonById(lessonId) {
    try {
      const result = await pool.query('SELECT * FROM lessons WHERE id = $1', [lessonId]);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Adds to db a new lesson.
   * @async
   * @method
   * @param   {Object}     data    [lesson data]
   * @returns {Object}             [Added lesson object]
   * @throws  {newError}           [When the query to the db generates errors.]
   */
  async createLesson(data) {
    const { title, content, description, notebookId } = data;
    const id = uuidv4();

    try {
      console.log("adding lesson", data)
      const result = await pool.query('INSERT INTO lessons (id, title, content, description, notebook_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, title, content, description, notebookId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates in db a lesson object.
   * @async
   * @method
   * @param   {Object}     data    [lesson data]
   * @returns {Object}             [Updated lesson object]
   * @throws  {newError}           [When the query to the db generates errors.]
   */
  async update(data) {
    const { lessonId, title, content, description, notebookId } = data;

    try {
      const result = await pool.query('UPDATE lessons SET title = $2, content = $3, description = $4, notebook_id = $5 WHERE id = $1 RETURNING *',
        [lessonId, title, content, description, notebookId]
      );

      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Updates in db a lesson object.
   * @async
   * @method
   * @param   {UUID}      lessonId   [lesson id]
   * @throws  {newError}             [When the query to the db generates errors.]
   */
  async deleteLessonById(lessonId) {
    try {
      await pool.query('DELETE FROM lessons WHERE id = $1', [lessonId]);

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  /**
   * Retrieves from db all lessons assigned to a notebook.
   * @async
   * @method
   * @param   {Uuid}    notebookId  [notebook id]
   * @returns {Array}               [Array of lessons objects]
   * @throws  {newError}            [When the query to the db generates errors.]
   */
  async getLessonsByNotebookId(notebookId) {
    try {
      const result = await pool.query('SELECT * FROM lessons WHERE notebook_id = $1', [notebookId]);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}
