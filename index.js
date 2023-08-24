import express from "express";
import { startServer } from "./src/config/server/server-config.js";
import middlewares from "./src/middlewares/utils/middlewares.js";
import routeIndex from "./src/routes/routeIndex.js";
import dotenv from "dotenv";
import { createStockData } from "./src/helpers/db/redis-db-helper.js";
// import { scheduleCronJob } from "./src/services/scrapeStockData.js";
// import { watchVariable } from "./src/services/variableWatcher.js";

const app = express();

// for getting env variables
dotenv.config();

// calling all the essential middlewares
app.use(middlewares);

global.cronJobCompleted = false;

// entry to all routes
app.use("/", routeIndex);

// Start the server
startServer(app);

setInterval(() => createStockData(), 1200000);
