const authRouter = require("../routes/authRouter");
const notebookRouter = require("../routes/notebookRouter");
const lessonRouter = require("../routes/lessonRouter");

module.exports = (app, passport) => {

  authRouter(app, passport);
  notebookRouter(app);
  lessonRouter(app);
}
