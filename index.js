import express from 'express';
import { startServer } from './src/config/server/server-config.js';
import middlewares from './src/middlewares/utils/middlewares.js';
import connectRedis from './src/config/db/redis-config.js';
import dotenv from 'dotenv';

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

connectRedis();

// entry to all routes
// app.use('/', routeIndex);

// for listening
startServer(app);