import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

let client = null;

export function getClient() {
    if (!client) {
        client = createClient();

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

        // window.addEventListener('beforeunload', () => {
        //     closeRedisConnection(client); // Close Redis connection when the user leaves the web app
        // });
    }

    return client;
}