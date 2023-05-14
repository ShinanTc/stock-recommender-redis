import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

function connectRedis(req, res) {

    try {
        const client = createClient();

        // on error event
        client.on('error', (err) => {
            console.error('Redis Client Error', err);
            throw err;
        });

        client.connect((err) => {
            if (err) {
                console.error('Failed to connect to Redis', err);
                throw err;
            } else {
                console.log('Redis connection succesfull!!!');
                req.redisClient = client;
                throw err;
            }
        });
    } catch (error) {
        throw error;
    }

    console.log("Redis Connection Successfull");

};

export default connectRedis;