const authRouter = require("../routes/authRouter");
const notebookRouter = require("../routes/notebookRouter");

module.exports = (app, passport) => {

  authRouter(app, passport);
  notebookRouter(app);
}
