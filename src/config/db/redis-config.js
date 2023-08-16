// import { createClient } from "redis";
import { createClient } from '@vercel/kv';
import dotenv from "dotenv";

dotenv.config();

let client = null;

export function getClient() {
  if (!client) {

    // development
    // client = createClient({
    //   host: process.env.REDIS_HOST,
    //   port: process.env.REDIS_PORT,
    //   password: process.env.REDIS_PASSWORD
    // });
    
    // earlier production
    // client = createClient({
    //   host: process.env.process.env.KV_URL,
    //   // port: process.env.REDIS_PORT,
    //   port: 6379,  // default redis port
    //   password: process.env.KV_REST_API_TOKEN
    // });

    // current production
    client = createClient({
      url: process.env.KV_URL,
      token: process.env.KV_REST_API_TOKEN
    });
  
    console.log('KV_URL');
    console.log(process.env.KV_URL);

    console.log('KV_REST_API_TOKEN');
    console.log(process.env.KV_REST_API_TOKEN);

    // on error event
    client.on("error", (err) => {
      console.error("Redis Client Error", err);
      throw err;
    });

    // connect to redis
    client.connect((err) => {
      if (err) {
        console.error("Failed to connect to Redis", err);
        throw err;
      } else {
        console.log("Redis connection succesfull!!!");
        throw err;
      }
    });

    client.on("connect", () => {
      console.log("Redis connection Established");
    });
  }

  return client;
}
