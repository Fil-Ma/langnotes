const createError = require("http-errors");

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
          name: element.name,
          language: element.language,
          userId: element.user_id,
          description: element.description
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
        id: newNotebook.id,
        name: newNotebook.name,
        language: newNotebook.language,
        userId: newNotebook.user_id,
        description: newNotebook.description
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
        id: notebook.id,
        name: notebook.name,
        language: notebook.language,
        userId: notebook.user_id,
        description: notebook.description
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
        id: notebook.id,
        name: notebook.name,
        language: notebook.language,
        userId: notebook.user_id,
        description: notebook.description
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
