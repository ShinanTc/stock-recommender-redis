import { getClient } from "../../config/db/redis-config.js";
import { scrapeStockData } from "../../services/scrapeStockData.js";
import {
  removeNaNvalues,
  removeNonProfitableTrades,
  getHighestProfitableTrades,
  turnIntoKeyValueFormat,
} from "../processScrapedData.js";
import { createClient, kv } from "@vercel/kv";
import dotenv from "dotenv";

dotenv.config();

// create stock data
export async function createStockData() {
  try {
    // getting the created redis client
    let redisClient = await getClient();

    // delete all stock values
    await redisClient.flushDb();

    let stockData = await scrapeStockData();

    // removing NaN values
    stockData = await removeNaNvalues(stockData);

    // removing trades on loss
    stockData = await removeNonProfitableTrades(stockData);

    stockData = await getHighestProfitableTrades(stockData);

    stockData = await turnIntoKeyValueFormat(stockData);

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

// get all stock keys
export async function getAllStockKeys() {

  const redisClient = createClient({
    url: process.env.KV_URL,
    token: process.env.KV_REST_API_TOKEN
  });

  try {

    const stockKeys = await redisClient.hkeys("*");

    console.log('stockKeys');
    console.log(stockKeys);

    return stockKeys;
  } catch (err) {
    console.error("Failed to get stock data");
    throw err;
  }
}

// get all stock values
export async function getAllStockValues() {
  // const redisClient = await getClient();
  // const redisClient = createClient();

  const stockKeys = await getAllStockKeys();
  // const stockValues = [];

  // for (var key of stockKeys) {
  //   var stockValue = await redisClient.get(`${key}`);
  //   stockValues.push(stockValue);
  // }

  // return stockValues;
}
