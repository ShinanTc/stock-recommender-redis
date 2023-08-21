import cron from "node-cron";

export const scheduleCronJob = () => {
  return new Promise((resolve) => {
    console.log("scheduling cron job");

    cron.schedule("0 10 * * *", () => {
      console.log("IT'S 10 AM");
      resolve(); // Resolve the promise when the cron job is executed.
    }, {
      timezone: "Asia/Kolkata",
    });
  });
};