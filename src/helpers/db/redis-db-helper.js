import { getClient } from "../../config/db/redis-config.js";
import { scrapeStockData } from "../../services/scrapeStockData.js";

// create stock data
export async function createStockData() {

    try {

        // getting the created redis client
        let client = await getClient();

        let stockData = await scrapeStockData();

        for (var i = 0; i < stockData.length; i++) {
            console.log(i);

            // key : value
            await client.set(i + 1, stockData[i]);
        }

        // let currentDateTime = new Date();

        // // adding the last scraped time
        // await client.set('last-updated', currentDateTime);

        // console.log("Data saved to database");

    } catch (error) {
        throw error;
    }

}

createStockData();