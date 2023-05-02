import './db/index.js';
import express from 'express';
import cors from 'cors';
import postsRouter from './routes/postsRouter.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
const port = process.env.PORT || 9000;

app.use(cors({ origin: '*' }));
app.use('/posts', postsRouter);
app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => console.log(`Resource server is running at http://localhost:${port}`));
