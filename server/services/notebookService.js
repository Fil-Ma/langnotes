const createError = require("http-errors");
const NotebookQueries = require("../queries/notebook");
const NotebookQueriesInstance = new NotebookQueries();

module.exports = class NotebookService {

  async loadNotebooks(userId) {

    console.log("NotebookService --# Called Get Notebooks Service");

    try {
      console.log("NotebookService --# Serching for notebooks owned by the user");
      const notebooks = await NotebookQueriesInstance.findAllByUserId(userId);

      if (!notebooks) {
        console.log("NotebookService --# There are no notebooks available for the user");
        return [];
      }

      console.log("NotebookService --# Notebooks found! Returning infos");
      return notebooks;

    } catch(err) {
      throw err;
    }
  }


}
