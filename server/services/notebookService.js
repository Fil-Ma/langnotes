const createError = require("http-errors");

const NotebookQueries = require("../queries/notebook");
const NotebookQueriesInstance = new NotebookQueries();

module.exports = class NotebookService {

  // This function retrieves all notebooks assigned to a user (by id)
  async loadAllNotebooks(userId) {

    // console.log("NotebookService --# Called Get Notebooks Service");

    try {
      // console.log("NotebookService --# Serching for notebooks owned by the user");
      const notebooks = await NotebookQueriesInstance.findAllByUserId(userId);

      if (!notebooks) {
        // console.log("NotebookService --# There are no notebooks available for the user");
        return [];
      }

      // console.log("NotebookService --# Notebooks found! Returning infos");
      return notebooks;

    } catch(err) {
      throw err;
    }
  }

  // This function adds a new notebook
  async addNotebook(notebook) {

    console.log("NotebookService --# Called Add Notebook Service");

    try {
      console.log("NotebookService --# Adding notebook to db");
      const newNotebook = await NotebookQueriesInstance.createNotebook(notebook);

      console.log("NotebookService --# Notebook added! Returning");
      return newNotebook;

    } catch(err) {
      throw err;
    }
  }


}
