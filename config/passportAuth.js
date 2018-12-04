import passport from 'passport';
import { googleStrategy, facebookStrategy, twitterStrategy } from './strategies';

const passportAuth = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  googleStrategy();
  facebookStrategy();
  twitterStrategy();
};

export default passportAuth;
