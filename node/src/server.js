import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { router } from './router';
import './database';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

app.use(router);

const SERVER_PORT = process.env.SERVER_PORT || 3001;

app.listen(SERVER_PORT, () => console.log(`Server listening on port: ${SERVER_PORT}`));

