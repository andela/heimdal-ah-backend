import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import validator from 'express-validator';

// Import The Routes Index File =========================================
import routes from './routes';

const logger = nodeLogger.createLogger();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use('/api/v1', routes);

// // Default to here when an invalid endpoint is entered
app.use('/', (req, res) => res.status(200).json({
  success: true,
  message: 'Welcome to Authors Haven by Heimdal'
}));

app.listen(PORT, () => {
  logger.info(`connected on port ${PORT}`);
});

export default app;
