const { pool } = require("../database");
const { v4: uuidv4 } = require("uuid");

module.exports = class LessonQueries {

  // Create one lessons in db
  async createLesson(data) {
    const { title, content } = data;

    try {
      const id = uuidv4();

      const result = await pool.query('INSERT INTO lessons (id, title, content) VALUES ($id, $title, $content) RETURNING *',
        [id, title, content]
      );

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Update lessons data
  async updateLesson(data) {
    const { id, title, content } = data;

    try {
      const result = await pool.query('UPDATE lessons SET title = $title, content = $content WHERE id = $id RETURNING *',
        [title, content, id]
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
  async deleteLesson(id) {
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
