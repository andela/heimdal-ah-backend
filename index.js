import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import passport from 'passport';
import {
  auth, profiles, user, password, twitterRouter, bookmarks
} from './routes';

import logger from './config/logger';
import passportAuth from './config/passportAuth';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

app.use('/api/v1/auth', auth);
app.use('/api/v1/auth_twitter', twitterRouter);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/password', password);
app.use('/api/v1/users', user);
app.use('/api/v1/bookmarks', bookmarks);
passportAuth();

// Default to here when an invalid endpoint is entered

app.use((req, res) => res.status(404).json({ message: 'not found' }));

app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
});

export default app;
