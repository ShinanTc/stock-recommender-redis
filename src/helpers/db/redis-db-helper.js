import { getClient } from "../../config/db/redis-config.js";
import { scrapeStockData } from "../../services/scrapeStockData.js";
import { removeNaNvalues, removeNonProfitableTrades, getHighestProfitableTrades } from "../processScrapedData.js";

// create stock data
export async function createStockData() {

    try {

        // getting the created redis client
        let client = await getClient();

        let stockData = await scrapeStockData();

        // // removing NaN values
        stockData = await removeNaNvalues(stockData);

        // // removing trades on loss
        stockData = await removeNonProfitableTrades(stockData);

        stockData = await getHighestProfitableTrades(stockData);

        // store these datas to the database

        console.log('stockData');
        console.log(stockData);

    } catch (error) {
        throw error;
    }

}

createStockData();