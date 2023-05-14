import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// utitility middlewares which are essential for this project
app.use(express.json());
app.use(helmet());
app.use(cors());

export default app;