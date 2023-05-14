import dotenv from 'dotenv';
import { createClient } from 'redis';

dotenv.config();

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

console.log("Redis connected succefully!");