import { getClient } from "../../config/db/redis-config.js";
import { scrapeStockData } from "../../services/scrapeStockData.js";
import { removeNaNvalues, removeNonProfitableTrades, getHighestProfitableTrades, turnIntoKeyValueFormat } from "../processScrapedData.js";

// create stock data
export async function createStockData() {

    try {

        // getting the created redis client
        let redisClient = await getClient();

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
            await redisClient.set(key, value)
                .then(() => console.log("Data stored successfully"))
                .catch((error) => console.error('Failed to store data in Redis', error));
        }

    } catch (error) {
        throw error;
    }

}

createStockData();