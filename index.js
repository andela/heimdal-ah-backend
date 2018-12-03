import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import Chance from 'chance';
import validator from 'express-validator';
import Routes from './routes/index';

const logger = nodeLogger.createLogger();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.listen(PORT, () => {
  logger.info(`connected on port ${PORT}`);
});

app.use('/api/v1', Routes);

// Routes(app);


export default app;
