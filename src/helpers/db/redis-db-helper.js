import { getClient } from "../../config/db/redis-config.js";

// create stock data
export async function createStockData(stockData) {

    let client = getClient();

    client.set('stockdata', 'HDFCBANK');
    let stockName = await client.get('stockname');
}

// get stock data
// async function getStockData(client) {
//     let stockName = await client.get('stockname');
    // https://www.indiainfoline.com/stock-ideas
// }

// delete stock data
// async function deleteStockData(client) {
//     client.del('stockname', 'HDFCBANK');
//     let stockName = await client.get('stockname');
// }