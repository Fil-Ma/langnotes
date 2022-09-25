const passport = require("passport");
const LocalStrategy = require("passport-local");

const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService();

module.exports = (app) => {

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // User serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // User deserialization
  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  // Local login
  passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        console.log("Passport local authentication")
        const user = await AuthServiceInstance.login({
          email, password
        });

        return done(null, user);

      } catch(err) {
        return done(err);
      }
    }
  ));

  return passport;
}
