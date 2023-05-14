import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import redisMiddleware from '../../config/db/redis-config.js';

const app = express();

// utitility middlewares which are essential for this project
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(redisMiddleware());

export default app;
// module.exports = app;