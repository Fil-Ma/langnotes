const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

const UserService = require("../services/userService");
const UserServiceInstanced = new UserService();

module.exports = (app, passport) => {

  // configuring router to manage /api/auth url based route
  app.use('/api/auth', router);

  // POST route for user credentials registration
  router.post('/register',
    [
      check('email').isEmail().normalizeEmail(),
      check('password').isStrongPassword({
        minLength: 8,
        maxLength: 16,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ],
    async (req, res, next) => {

      console.log("######################");
      console.log("Register POST request");

      const errors = validationResult(req);

      // Check if the validation threw errors
      if (!errors.isEmpty()) {

        console.log("Invalid inputs");
        next(new Error("Invalid inputs"));

      } else {
        try {
          const { email, password } = req.body;

          const response = await AuthServiceInstance.register({ email, password });

          console.log("User registered");
          return res.status(201).send(response);

        } catch(err) {
          next(err);
        }
      }
  });

  // POST route for user credentials login
  router.post('/login',
    [
      check('email').isEmail().normalizeEmail(),
      check('password').isStrongPassword({
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

      console.log("######################");
      console.log("Login POST request");

      const errors = validationResult(req);

      // Check if the validation threw errors
      if (!errors.isEmpty()) {

        console.log("Invalid inputs");
        next(new Error("Invalid inputs"));

      } else {
        try {
          const { email, password } = req.body;

          const response = await AuthServiceInstance.login({ email, password });

          console.log("Login success");
          res.status(200).send(response);

        } catch(err) {
          next(err);
        }
      }
  });

  router.get('/google', passport.authenticate('google', { scope: ["profile"] } ));

  router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async (req, res, next) => {
      res.redirect('/dashboard');
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
      console.log("User is logged out");
      res.status(200).send();
    } catch(err) {
      next(err);
    }
  });

}