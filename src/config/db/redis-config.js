import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();


export function connectRedis() {

    const client = createClient();

    // on error event
    client.on('error', err => {
        console.error('Redis Client Error', err);
        throw err;
    });

    // connect to redis
    client.connect(err => {
        if (err) {
            console.error('Failed to connect to Redis', err);
            throw err;
        } else {
            console.log('Redis connection succesfull!!!');
            throw err;
        }
    });

    client.on('connect', () => {
        console.log('Redis connection Established');
    });

    window.addEventListener('beforeunload', () => {
        closeRedisConnection(client); // Close Redis connection when the user leaves the web app
    });
}

export function closeRedisConnection(client) {
    client.quit((err, reply) => {
        if (err) {
            console.error('Error closing Redis connection:', err);
        } else {
            console.log('Redis connection closed');
        }
    });
}