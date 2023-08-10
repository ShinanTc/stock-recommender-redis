import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let client = null;

export function getClient() {

  if (!client) {
    client = createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });

    console.log('client');
    console.log(client);

    // on error event
    // client.on("error", (err) => {
    //   console.error("Redis Client Error", err);
    //   throw err;
    // });

    // // connect to redis
    // client.connect((err) => {
    //   if (err) {
    //     console.error("Failed to connect to Redis", err);
    //     throw err;
    //   } else {
    //     console.log("Redis connection succesfull!!!");
    //     throw err;
    //   }
    // });

    // client.on("connect", () => {
    //   console.log("Redis connection Established");
    // });
  }

  return client;
}
