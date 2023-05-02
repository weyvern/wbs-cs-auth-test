import './db/index.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use('/auth', authRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => console.log(`Auth server is running at http://localhost:${port}`));
