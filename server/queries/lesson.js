const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class LessonQueries {

  // Get lesson by id
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

  // Create one lessons in db
  async createLesson(data) {
    const { title, content, description, notebookId } = data;

    // console.log("querying db for lesson insert")
    try {
      const id = uuidv4();

      // console.log(id, title, content, description, notebookId)

      const result = await pool.query('INSERT INTO lessons (id, title, content, description, notebook_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, title, content, description, notebookId]
      );

      if (result.rows?.length) {
        // console.log("returning ", result.rows[0])
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Update lessons data
  async update(data) {
    const { id, title, content, description, notebookId } = data;

    try {
      const result = await pool.query('UPDATE lessons SET title = $2, content = $3, description = $4, notebook_id = $5 WHERE id = $1 RETURNING *',
        [id, title, content, description, notebookId]
      );

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch(err) {
      throw new Error(err);
    }
  }

  // Delete one lessons in db by id
  async deleteLessonByid(id) {
    try {
      await pool.query('DELETE FROM lessons WHERE id = $id', [id]);

      return null;
    } catch(err) {
      throw new Error(err);
    }
  }

  // Retrieve all lessons assigned to a notebook
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
