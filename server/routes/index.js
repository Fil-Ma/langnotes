const authRouter = require("./authRouter");

module.exports = (app, passport) => {
  authRouter(app, passport);
}
