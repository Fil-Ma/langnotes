const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const LocalStrategy = require("passport-local");

const { GOOGLE, FACEBOOK } = require("../config");
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
        const user = await AuthServiceInstance.login({
          email, password
        });

        return done(null, user);

      } catch(err) {
        return done(err);
      }
    }
  ));

  // Google login
  passport.use(new GoogleStrategy({
      clientID: GOOGLE.CONSUMER_KEY,
      clientSecret: GOOGLE.CONSUMER_SECRET,
      callbackURL: GOOGLE.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthServiceInstance.googleLogin({
          id: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value
        });
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  // Facebook Login
  passport.use(new FacebookStrategy({
      clientID: FACEBOOK.CONSUMER_KEY,
      clientSecret: FACEBOOK.CONSUMER_SECRET,
      callbackURL: FACEBOOK.CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await AuthServiceInstance.facebookLogin(profile);
        return done(null, user);
      } catch(err) {
        return done(err);
      }
    }
  ));

  return passport;
}
