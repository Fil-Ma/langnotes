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
    try {
      const { email, password } = req.body;
      if (validator.isEmail(email)) {
        const response = await AuthServiceInstance.register({email, password});

        return res.status(201).send(response);

      } else {
        next(new Error("Invalid email format"));
      }

    } catch(err) {
      next(err);
    }
  });

  router.post('/login', passport.authenticate('local'), async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (validator.isEmail(email)) {
        const response = await AuthServiceInstance.login({ email, password });

        res.status(200).send(response);
      } else {
        next(new Error("Invalid email format"));
      }

    } catch(err) {
      next(err);
    }
  });

  router.get('/logged_in', async (req, res, next) => {
    try {
      const { id } = req.user;

      const user = await UserServiceInstance.get({ id });
      // retrieve all booknotes managed by user

      res.status(200).send({
        loggedIn: true,
        user
      });

    } catch(err) {
      next(err);
    }
  });

  router.post('/logout', async (req, res, next) => {
    try {
      req.logout;
    } catch(err) {
      next(err);
    }
  });

}
