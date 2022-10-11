const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const session = require("express-session");
const { SESSION_SECRET } = require("../config");

module.exports = (app) => {

  // Enable CORS
  app.use(cors());

  // enable helmet
  app.use(helmet());

  // Transforms raw string of req.body into JSON
  app.use(bodyParser.json());

  // Parses urlencoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));

  // trust client proxy
  app.set("trust proxy", 1);

  // Create session
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 24*60*60*1000,
        secure: true,
        sameSite: 'strict'
      }
    })
  );

  return app;
}
