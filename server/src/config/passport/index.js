const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { googleAuth, facebookAuth } = require("./socialProviders");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
const googlePassportConfig = () => {
  return passport.use(
    new GoogleStrategy(
      {
        clientID:
          "410083215380-ldcvo6a1c00qn2e0bt5a4cao6epnsdlo.apps.googleusercontent.com",
        clientSecret: "M5lyRu6sMvGKExLkUaLyg97v",
        callbackURL: "http://localhost:4000/auth/google/callback",
      },
      function (accessToken, refreshToken, profile, cb) {
        // Register user here.
        googleAuth(profile);
        cb(null, profile);
      }
    )
  );
};

const facebookPassportConfig = () => {
  return passport.use(
    new FacebookStrategy(
      {
        clientID: "3624660664299714",
        clientSecret: "c88215c0c8804d20b6159b3438e4ff4c",
        callbackURL: "http://localhost:4000/auth/facebook/callback",
        profileFields: ["id", "displayName", "name", "email"],
        passReqToCallback: true,
      },
      function (req, accessToken, refreshToken, profile, done) {
        // Register user here.
        try {
          if (profile) {
            facebookAuth(profile);
            // console.log(profile)
            // req.user = profile
            done(null, profile)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  );
};

module.exports = {
  googlePassportConfig,
  facebookPassportConfig,
};
