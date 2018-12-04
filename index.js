import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import validator from 'express-validator';
import { auth, user } from './routes/index';

const logger = nodeLogger.createLogger();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/v1/forgotpassword', user);
app.use('/api/v1/auth', auth);

app.listen(PORT, () => {
  logger.log(`connected on port ${PORT}`);
});

export default app;
