import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import session from 'express-session';

import { auth, profiles, user } from './routes';
import logger from './config/logger';
import passportAuth from './config/passportAuth';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));


app.use('/api/v1/auth', auth);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/forgotpassword', user);
// passportAuth(app);

app.use((req, res) => res.status(404).json('not found'));

app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
});

export default app;
