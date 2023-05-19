import { getClient } from "../../config/db/redis-config.js";

// create stock data
export async function createStockData() {

    let client = getClient();

    client.set('stockname', 'HDFCBANK');
    let stockName = await client.get('stockname');
}

// get stock data
// async function getStockData(client) {
//     client.get('stockname', 'HDFCBANK');
//     let stockName = await client.get('stockname');
// }

// delete stock data
// async function deleteStockData(client) {
//     client.del('stockname', 'HDFCBANK');
//     let stockName = await client.get('stockname');
// }