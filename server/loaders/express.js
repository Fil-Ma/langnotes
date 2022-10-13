const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const { SESSION_SECRET } = require("../config");

module.exports = (app) => {

  // Enable CORS
  app.use(cors({
    origin: "https://accounts.google.com/o/oauth2/v2/auth",
    optionsSuccessStatus: 200
  }));

  // enable helmet
  app.use(helmet());

  app.use(morgan('dev'));

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
        maxAge: 24*60*60*1000
      }
    })
  );

  return app;
}
