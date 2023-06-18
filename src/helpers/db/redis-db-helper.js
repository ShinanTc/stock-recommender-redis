import { getClient } from "../../config/db/redis-config.js";
import { scrapeStockData } from "../../services/scrapeStockData.js";

// create stock data
export async function createStockData() {

    try {

        // getting the created redis client
        let client = await getClient();

        let stockData = await scrapeStockData();

        console.log('stockData');
        console.log(stockData);

    } catch (error) {
        throw error;
    }

}

createStockData();