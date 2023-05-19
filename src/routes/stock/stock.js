import express from 'express';
import { createStockData } from '../../helpers/db/redis-db-helper.js';

const router = express.Router();

// TEST ROUTES
router.get('/', (req, res) => {
    console.log("Inside / route");
});

router.post('/', (req, res) => {
    createStockData();
});

export default router;