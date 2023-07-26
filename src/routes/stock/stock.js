import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { sendDataToClient } from "../../handlers/responseHandler.js";
import {
  getHighestProfitableTrades,
  removeUnaffordableStocks,
} from "../../helpers/processScrapedData.js";
import { getAllStockValues } from "../../helpers/db/redis-db-helper.js";

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
    // stocks = await getHighestProfitableTrades(req.query.budget, stocks);

    sendDataToClient(res, filePath, "stocksData", stocks);
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return res.status(500).send("Server error");
  }
});

export default router;
