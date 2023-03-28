import express from 'express';
import { router } from './routes';
import cors from 'cors';
import'@infra/crons';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

export { app };
