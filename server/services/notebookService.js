const createError = require("http-errors");
const he = require("he");

const NotebookQueries = require("../queries/notebook");
const NotebookQueriesInstance = new NotebookQueries();

module.exports = class NotebookService {

  // This function retrieves all notebooks assigned to a user (by id)
  async loadAllNotebooks(userId) {
    try {
      const notebooks = await NotebookQueriesInstance.findAllByUserId(userId);

      if (!notebooks) {
        return [];
      }

      return notebooks.map(element => {
        return {
          id: element.id,
          name: he.decode(element.name),
          language: he.decode(element.language),
          userId: element.user_id,
          description: he.decode(element.description)
        };
      });

    } catch(err) {
      throw createError(500, err);
    }
  }

  // This function adds a new notebook
  async addNotebook(notebook) {
    try {
      const newNotebook = await NotebookQueriesInstance.createNotebook(notebook);

      return {
        id: element.id,
        name: he.decode(element.name),
        language: he.decode(element.language),
        userId: element.user_id,
        description: he.decode(element.description)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // get notebook data by id
  async loadNotebookDataById(notebookId) {
    try {
      const notebook = await NotebookQueriesInstance.getById(notebookId);

      return {
        id: element.id,
        name: he.decode(element.name),
        language: he.decode(element.language),
        userId: element.user_id,
        description: he.decode(element.description)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // update notebook data
  async updateNotebookData(data) {
    const { id, name, language, userId, description } = data;

    try {
      const notebook = await NotebookQueriesInstance.update({
        id,
        name,
        language,
        userId,
        description
      });

      return {
        id: element.id,
        name: he.decode(element.name),
        language: he.decode(element.language),
        userId: element.user_id,
        description: he.decode(element.description)
      };

    } catch(err) {
      throw createError(500, err);
    }
  }

  // delete notebook
  async deleteNotebook(notebookId) {
    try {
      await NotebookQueriesInstance.delete(notebookId);

      return;

    } catch(err) {
      throw createError(500, err);
    }
  }


}
