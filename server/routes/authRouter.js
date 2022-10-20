const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

const UserService = require("../services/userService");
const UserServiceInstance = new UserService();

const NotebookService = require("../services/notebookService");
const NotebookServiceInstance = new NotebookService();

module.exports = (app, passport) => {

  // configuring router to manage /api/auth url based route
  app.use('/api/auth', router);

  // POST route for user credentials registration
  router.post('/register',
    [
      body('email', 'Your email is not valid').trim().isEmail().normalizeEmail(),
      body('password', 'Password not strong enough').isStrongPassword({
        minLength: 8,
        maxLength: 16,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ],
    async (req, res, next) => {
      const { email, password } = req.body;

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        const response = await AuthServiceInstance.register({ email, password });

        return res.status(201).send(response);

      } catch(err) {
        next(err);
      }
  });

  // POST route for user credentials login
  router.post('/login',
    [
      body('email', 'Email format is not valid').trim().isEmail().normalizeEmail(),
      body('password', 'Email format is not valid').isStrongPassword({
        minLength: 8,
        maxLength: 16,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ],
    passport.authenticate('local'),
    async (req, res, next) => {

      try {
        // check validation errors
        const errors = validationResult(req).array();

        if (errors.length > 0) {
          throw new Error(errors[0].msg);
        }

        res.send({
          user: req.user,
        });
      } catch(err) {
        next(err);
      }
  });

  router.get('/google', passport.authenticate('google', { scope: ["profile", "email"] } ));

  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: 'http:localhost:3000/login' }),
    async (req, res, next) => {
      res.send();
    }
  );

  router.get(['/facebook', 'facebook/callbak'], (req, res, next) => {
    res.status(500).send("Service not implemented");
  });

  // Facebook login is here disabled, to use it uncomment the following lines and delete the route above
  // router.get('/facebook', passport.authenticate('facebook'));
  //
  // router.get('/facebook/callback',
  //   passport.authenticate('facebook', { failureRedirect: '/login' }),
  //   async (req, res) => {
  //     res.redirect('/dashboard');
  //   }
  // );

  router.get('/logged_in', async (req, res, next) => {
    try {
      // user id
      const { id } = req.user;

      // check if user exists
      const user = await UserServiceInstance.get({ id });

      // load notebooks assigned to the user (by id)
      const notebooks = await NotebookServiceInstance.loadAllNotebooks(id);

      res.status(200).send({
        user,
        notebooks
      });

    } catch(err) {
      next(err);
    }
  });

  router.post('/logout', async (req, res, next) => {
    try {
      req.logout;

      return res.status(200).send();

    } catch(err) {
      next(err);
    }
  });

}
