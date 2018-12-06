import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import validator from 'express-validator';
import { auth, profiles, user } from './routes';

const logger = nodeLogger.createLogger();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1/auth', auth);
app.use('/api/v1/profiles', profiles);
app.use('/api/v1/users', user);
app.use('/api/v1/forgotpassword', user);

// Default to here when an invalid endpoint is entered
app.use('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Welcome to Authors Haven by Heimdal'
}));

app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
});

export default app;
