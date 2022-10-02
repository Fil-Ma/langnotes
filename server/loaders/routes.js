const authRouter = require("../routes/authRouter");
const notebookRouter = require("../routes/notebookRouter");
const lessonRouter = require("../routes/lessonRouter");
const vocabularyRouter = require("../routes/vocabularyRouter");

module.exports = (app, passport) => {

  authRouter(app, passport);
  notebookRouter(app);
  lessonRouter(app);
  vocabularyRouter(app);
}
