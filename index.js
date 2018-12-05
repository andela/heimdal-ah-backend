import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import validator from 'express-validator';
import { auth, profiles } from './routes/index';

const logger = nodeLogger.createLogger();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/v1', auth);

app.use('/api/v1/profiles', profiles);

app.listen(PORT, () => {
  logger.info(`connected on port ${PORT}`);
});

export default app;
