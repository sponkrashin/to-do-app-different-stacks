import cookieParserMiddleware from 'cookie-parser';
import express from 'express';
import loggerMiddleware from 'morgan';
import todoRouter from './routes/todosRoute';

const app = express();

app.use(loggerMiddleware('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParserMiddleware());

app.use('/todo', todoRouter);

export default app;
