const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");

const passportLoader = require("./passport");
const { PORT, SESSION_SECRET } = require("config");

const app = express();

// Enable CORS
app.use(cors());

// Transforms raw string of req.body into JSON
app.use(bodyParser.json());

// Parses urlencoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// ?
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

// Function calling passport configuration
const passportConfiguration = async (app) => {
  const passport = await passportLoader(app);
}

// Passport configuration
passportConfiguration(app);

// Error handler
app.use((err, req, res, next) => {
  const { message, status } = err;
  return res.status(status).send({ message });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
