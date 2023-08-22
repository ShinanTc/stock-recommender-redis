import { createStockData } from "../helpers/db/redis-db-helper.js";

export function watchVariable() {
  console.log("Inside watchVariable");

  if (global.cronJobCompleted === true) {
    createStockData();
    // Set cronJobCompleted back to false after execution
    global.cronJobCompleted = false;
  }
}
