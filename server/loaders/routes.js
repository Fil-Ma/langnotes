const authRouter = require("../routes/authRouter");

module.exports = (app, passport) => {

  app.use('', (req, res, next) => {
    console.log("incoming request to be routed");
    next();
  })

  authRouter(app, passport);
}
