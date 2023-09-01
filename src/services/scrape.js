import puppeteer from "puppeteer";
import {
  collectStockInformation,
  validateScrape,
} from "../helpers/scrape/scrapeStockDataHelpers.js";
import cron from "node-cron";
import { createStockData } from "../helpers/db/redis-db-helper.js";

// for scraping the stock data
export async function scrapeStockData() {
  try {
    console.log("Inside scrapeStockData function");

    // open the browser
    const browser = await puppeteer
      .launch({
        headless: "new",
        args: ["--no-sandbox"],
      })
      .catch((error) => console.error(error));

    console.log("after launching the browser");

    // getting the first tab
    const page = (await browser.pages())[0];

    console.log("after getting the first tab");

    // go to the website
    await page.goto("https://www.indiainfoline.com/stock-ideas/");

    console.log("Entered indiainfoline.com website");

    let stockDetails = {
      stocks: [],
      scrapeCount: 1,
    };

    // Wrap the scraping process in a promise
    const stocksPromise = new Promise(async (resolve, reject) => {
      console.log("Inside stocksPromise variable");

      setTimeout(async () => {
        try {
          // close the popup button
          const popupCloseBtnXpath =
            "/html/body/app-root/app-new-lead-grid-form/div[1]/div/button/img";
          const popupCloseBtn = await page.waitForXPath(popupCloseBtnXpath);
          popupCloseBtn.click();

          var { stocks, numberOfPagesScraped } = await collectStockInformation(
            page
          );

          stockDetails.stocks.push(stocks);
          stockDetails.scrapeCount = await numberOfPagesScraped;

          stockDetails = await validateScrape(page, stockDetails);

          await browser.close();

          resolve(stockDetails.stocks[0]); // Resolve the promise with the stocks array
        } catch (error) {
          // error message when the pop up did not appear
          let errorMsg =
            "Waiting for selector `/html/body/app-root/app-new-lead-grid-form/div[1]/div/button/img` failed: Waiting failed: 30000ms exceeded";

          // if it is a timeout error (that pop up didn't appear)
          if (error.name === "TimeoutError" && error.message === errorMsg) {
            var { stocks, numberOfPagesScraped } =
              await collectStockInformation(page);

            stockDetails.stocks.push(stocks);
            stockDetails.scrapeCount = await numberOfPagesScraped;

            stockDetails = await validateScrape(page, stockDetails);

            await browser.close();

            resolve(stockDetails.stocks[0]); // Resolve the promise with the stocks array
          } else {
            await browser.close();
            reject(error); // Reject the promise if an error occurs
          }
        }
      }, 12000); // Set the timeout duration for the scraping process
    });

    return stocksPromise; // Return the promise for awaiting the stocks data
  } catch (error) {
    throw error; // Throw any error that occurs during the process
  }
}

// Schedule the cron job to run every day at 10 AM Indian time (IST)
// Call the createStockData function when the cron job runs
// Set the timezone to Indian Standard Time (IST)
cron.schedule("0 10 * * *", createStockData, { timezone: "Asia/Kolkata" });
