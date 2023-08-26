import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { sendDataToClient } from "../../handlers/responseHandler.js";
import {
  getHighestProfitableTrades,
  removeUnaffordableStocks,
} from "../../helpers/scrape/processScrapedData.js";
import { getAllStockValues } from "../../helpers/db/redis-db-helper.js";
import { createStockData } from "../../helpers/db/redis-db-helper.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.get("/", (req, res) => {
  // Specify the path to your HTML file
  const filePath = path.join(__dirname, "../../../public/index.html");

  // Send the file as the response
  res.sendFile(filePath);
});

router.get("/get-stocks", async (req, res) => {
  const filePath = path.join(__dirname, "../../../public/view-stocks.html");

  try {
    let stocks = await getAllStockValues();
    stocks = removeUnaffordableStocks(stocks, req.query.budget);
    stocks = await getHighestProfitableTrades(stocks);

    sendDataToClient(res, filePath, "stocksData", stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return res.status(500).send("Server error");
  }
});

router.get("/api/cron", async (req, res) => {
  await createStockData();
  res.send("Cron job is working");
});

// router.get("/api/cron", async (req, res) => {
//   console.log("Cron job is working (FROM ROUTE)");
//   res.send("Cron job is working");
// });

export default router;
