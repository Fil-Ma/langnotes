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
    console.log("DATABASE querying --# Lesson INSERT function");
    const { title, content, description, notebookId } = data;

    try {
      const id = uuidv4();

      console.log("DATABASE querying --# Querying db for insertion");
      const result = await pool.query('INSERT INTO lessons (id, title, content, description, notebook_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, title, content, description, notebookId]
      );

      console.log("DATABASE querying --# Lesson added. Returning data...");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  // Update lessons data
  async update(data) {
    console.log("DATABASE querying --# Lesson UDDATE function");
    const { id, title, content, description, notebookId } = data;
    
    try {
      console.log("DATABASE querying --# Querying db for lesson update");
      const result = await pool.query('UPDATE lessons SET title = $2, content = $3, description = $4, notebook_id = $5 WHERE id = $1 RETURNING *',
        [id, title, content, description, notebookId]
      );

      console.log("DATABASE querying --# Lesson updated. Returning new data...");
      return result.rows[0];

    } catch(err) {
      throw new Error(err);
    }
  }

  // Delete one lessons in db by id
  async deleteLessonById(id) {
    console.log("DATABASE querying --# Lesson DELETE function");
    try {
      console.log("DATABASE querying --# Querying db for deletion");
      await pool.query('DELETE FROM lessons WHERE id = $1', [id]);

      console.log("DATABASE querying --# Item deleted. Returning...");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Retrieve all lessons assigned to a notebook
  async getLessonsByNotebookId(notebookId) {

    console.log("DATABASE querying --# Lesson LOAD ALL DATA function");
    try {
      console.log("DATABASE querying --# Querying db for info retrieval");
      const result = await pool.query('SELECT * FROM lessons WHERE notebook_id = $1', [notebookId]);

      if (result.rows?.length) {
        console.log("DATABASE querying --# Returning...");
        return result.rows;
      }

      console.log("DATABASE querying --# There are no lessons. Returning...");
      return null;

    } catch(err) {
      throw new Error(err);
    }
  }


}
