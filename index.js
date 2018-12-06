import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import nodeLogger from 'logger';
import validator from 'express-validator';
import { auth, profiles, users } from './routes/index';


const logger = nodeLogger.createLogger();
const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use('/api/v1/auth', auth);

app.use('/api/v1/profiles', profiles);
app.use('/api/v1/users', users);

app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Author\'s haven',
}));

app.listen(PORT, () => {
  logger.info(`connected on port ${PORT}`);
});

export default app;
