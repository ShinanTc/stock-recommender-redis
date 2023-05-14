import express from 'express';
import stock from './stock/stock.js';

const app = express();

// stock route
app.use('/', stock);

export default app;