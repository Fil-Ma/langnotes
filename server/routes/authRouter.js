const express = require("express");
const validator = require("validator");
const router = express.Router();

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

const UserService = require("../services/userService");
const UserServiceInstanced = new UserService();

module.exports = (app, passport) => {

  app.use('/api/auth', router);

  router.post('/register', async (req, res, next) => {

    console.log("######################");
    console.log("Register POST request");

    try {
      const { email, password } = req.body;

      console.log(`Credentials are: email - ${email} and password - ${password}`);

      if (validator.isEmail(email)) {
        const response = await AuthServiceInstance.register({email, password});

        console.log("User registered");

        return res.status(201).send(response);

      } else {
        next(new Error("Invalid email format"));
      }

    } catch(err) {
      next(err);
    }
  });

  router.post('/login', passport.authenticate('local'), async (req, res, next) => {

    console.log("######################");
    console.log("Login POST request");

    try {
      const { email, password } = req.body;

      console.log(`Credentials are: email - ${email} and password - ${password}`);

      if (validator.isEmail(email)) {
        const response = await AuthServiceInstance.login({ email, password });

        console.log("Login success");

        res.status(200).send(response);
      } else {
        next(new Error("Invalid email format"));
      }

    } catch(err) {
      next(err);
    }
  });

  router.get('/logged_in', async (req, res, next) => {

    console.log("######################");
    console.log("Login status GET request");

    try {
      const { id } = req.user;

      console.log(`Credentials are: id - ${id}`);

      const user = await UserServiceInstance.get({ id });
      // retrieve all booknotes managed by user

      console.log("Retrived user info");

      res.status(200).send({
        loggedIn: true,
        user
      });

    } catch(err) {
      next(err);
    }
  });

  router.post('/logout', async (req, res, next) => {

    console.log("######################");
    console.log("Logout POST request");

    try {
      req.logout;
    } catch(err) {
      next(err);
    }
  });

}
