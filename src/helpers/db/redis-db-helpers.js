import { promisify } from 'util';
import { stockDetails } from '../../redis/schema.js';

const setAsync = promisify(req.redisClient.set).bind(req.redisClient);
const getAsync = promisify(req.redisClient.get).bind(req.redisClient);

// create stock data
export async function createStockData(name, marketCap, ltp) {
    const stock = { name, marketCap, ltp };
    await setAsync(name, JSON.stringify(stock));
}

// async function getUser(username) {
//     const userStr = await getAsync(username);
//     if (!userStr) {
//         return null;
//     }
//     const user = JSON.parse(userStr);
//     if (!validateUser(user)) {
//         throw new Error('Invalid user object');
//     }
//     return user;
// }

// function validateUser(user) {
//     for (const field in userSchema) {
//         if (!user.hasOwnProperty(field)) {
//             return false;
//         }
//         const type = userSchema[field];
//         if (typeof user[field] !== type) {
//             return false;
//         }
//     }
//     return true;
// }

// export { createUser, getUser };