const authRouter = require("../routes/authRouter");

module.exports = (app, passport) => {
  authRouter(app, passport);
}
