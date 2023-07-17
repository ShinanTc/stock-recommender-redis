import puppeteer from "puppeteer";
import {
  collectStockInformation,
  validateScrape,
} from "../helpers/scrape/scrapeStockDataHelpers.js";

// go to the website
export async function scrapeStockData() {
  try {
    // const browser = await puppeteer.launch({ headless: "new" });
    const browser = await puppeteer.launch({ headless: false });

    // getting the first tab
    const page = (await browser.pages())[0];

    await page.goto("https://www.indiainfoline.com/stock-ideas/18");

    let stockDetails = {
      stocks: [],
      scrapeCount: 1,
    };

    // Wrap the scraping process in a promise
    const stocksPromise = new Promise(async (resolve, reject) => {
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