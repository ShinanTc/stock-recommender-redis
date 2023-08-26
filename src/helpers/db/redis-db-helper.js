import { scrapeStockData } from "../../services/scrapeStockData.js";
import {
  removeNaNvalues,
  removeNonProfitableTrades,
  getHighestProfitableTrades,
  turnIntoKeyValueFormat,
} from "../scrape/processScrapedData.js";
import { createClient } from "@vercel/kv";
import dotenv from "dotenv";

dotenv.config();

// create stock data
export async function createStockData() {
  console.log("Inside createStockData");

  try {
    // getting the created redis client
    let redisClient = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });

    // delete all stock values
    await redisClient.flushdb();

    let stockData = await scrapeStockData();

    console.log("stock scraping completed");

    // removing NaN values
    stockData = await removeNaNvalues(stockData);

    console.log("removed Nan values");

    // removing trades on loss
    stockData = await removeNonProfitableTrades(stockData);

    console.log("removed non profitable trades");

    stockData = await getHighestProfitableTrades(stockData);

    console.log("gained highest profitable trades");

    stockData = await turnIntoKeyValueFormat(stockData);

    console.log("turned into key value format");

    for (var data of stockData) {
      var key = data.key;
      var value = data.value;

      // store these datas to the database
      await redisClient
        .set(key, value)
        .then(() => console.log("Data stored successfully"))
        .catch((error) =>
          console.error("Failed to store data in Redis", error)
        );
    }

    // close redis connection
    await redisClient.quit();
  } catch (error) {
    throw error;
  }
}

// get all stock values
export async function getAllStockValues() {
  // create client
  const redisClient = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  // get all stock keys
  let stockKeys = await redisClient.keys("*");

  // create stockValue empty array
  const stockValues = [];

  // iterate though stockKeys and get each value
  for (var key of stockKeys) {
    if (key !== "stocks") {
      var stockValue = await redisClient.get(`${key}`);
      stockValues.push(stockValue);
    }
  }

  return stockValues;
}
