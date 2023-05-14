import express from 'express';

const router = express.Router();

// TEST ROUTE
router.get('/', (req, res) => {
    console.log("Inside / route");
});

export default router;