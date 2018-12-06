import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import validator from 'express-validator';
import passport from 'passport';
import {
  auth,
  profiles,
  user,
  passwords,
  twitterRouter
} from './routes';

import logger from './config/logger';
import passportAuth from './config/passportAuth';

const PORT = process.env.PORT || 8001;

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Author\'s haven',
}));

app.use('/api/v1/auth', auth);
app.use('/api/v1/auth_twitter', twitterRouter);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/passwords', passwords);
app.use('/api/v1/users', user);
passportAuth();

app.use((req, res) => res.status(404).json({ message: 'not found' }));


app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
});

export default app;
