import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import userRoutes from './routes/Users';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/v1/api/', userRoutes);

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});

export default app;
