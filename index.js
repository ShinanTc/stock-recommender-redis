import express from "express";
import { startServer } from "./src/config/server/server-config.js";
import middlewares from "./src/middlewares/utils/middlewares.js";
import routeIndex from "./src/routes/routeIndex.js";
import dotenv from "dotenv";
import { createStockData } from "./src/helpers/db/redis-db-helper.js"; // Assuming you have a separate file for createStockData.
import { scheduleCronJob } from "./src/services/scheduleScrape.js";

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

// connect to redis
// getClient();

// entry to all routes
app.use("/", routeIndex);

// Start the server
startServer(app);

(async () => {
  await scheduleCronJob(); // Wait for the cron job to complete

  // Call your other function after the cron job has completed
  await createStockData();
})();
