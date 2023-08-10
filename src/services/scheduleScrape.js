import cron from "node-cron";
import { createStockData } from "../helpers/db/redis-db-helper.js";

export const scheduleCronJob = async () => {
  console.log("scheduling cron job");

  // Schedule the cron job to run at 11:37 am every day in the 'Asia/Kolkata' time zone
  cron.schedule("00 10 * * *", createStockData, {
    timezone: "Asia/Kolkata",
  });
};