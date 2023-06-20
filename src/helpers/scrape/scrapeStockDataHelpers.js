// for getting the elements using xpath
export async function waitForXPathAndReturnElements(page, xPaths) {

    try {

        const promises = xPaths.map(xpath => page.waitForXPath(xpath));
        const element = await Promise.all(promises);

        return element;

    } catch (error) {
        // Handle timeout error
        if (error.name === 'TimeoutError')
            return 'TimeoutError';
    }

}

// clicking 'Next' button (going to the Next page)
export async function clickNext(page, selector) {
    try {

        await page.waitForSelector(selector);
        const elements = await page.$(selector);
        await elements.scrollIntoView();
        await page.evaluate(el => el.click(), elements);

        console.log('Going to the Next page');

    } catch (error) {

        // checking if it is a timeout error
        if (error.name === 'TimeoutError')
            return 'TimeoutError';
        else
            throw error;

    }
}

// get stock details from elements/xpaths
export async function getStockDetails(page, element) {
    let stockTickerName = await page.evaluate(el => el.textContent, element[0]);
    let ltp = await page.evaluate(el => el.textContent, element[1]);
    let target = await page.evaluate(el => el.textContent, element[2]);

    // 'stockTickerName' will be like this : TATAPOWER | NSE, so we need to extract the name only
    // log each variable for better understanding
    let exchange = await stockTickerName.split(' ')[2].trim();
    stockTickerName = await stockTickerName.split(' ')[0]?.trim();
    ltp = await ltp.split(' ')[2]?.trim();
    target = await target.trim();

    // there is a ₹20/- fee on selling a stock
    let profitAfterTradingExpense = (parseInt(target) - parseInt(ltp)) - 20;

    // we are not considering BSE stocks
    if (exchange === 'BSE')
        return;

    let stockData = `${stockTickerName}-${ltp}-${target}-${profitAfterTradingExpense}`;
    return stockData;
}


// collect stock information from each page
export async function collectStockInformation(page) {

    console.log('collecting stock information');

    // gathered stocks
    let stocks = [];

    // counting number of stocks in the current page
    let numberOfStocks = 0;
    let i = 1; // Start with the initial value for `i`

    // going throught the stock data in each page
    while (true) {
        let xPaths = [
            // stockTickerNameXpath
            `//*[@id="myGroup"]/tr[${i}]/td[1]/span[1]`, // stockTickerNameXpath
            // ltp
            `//*[@id="myGroup"]/tr[${i}]/td[3]`, // ltp
            // target
            `//*[@id="myGroup"]/tr[${i}]/td[4]/div/span[1]` // target
        ];

        let element;

        // Scrape the stock data for each row
        // i <= 21, because a page will only have maximum 10 stock datas, which means while loop iteration is only required untill i=21
        // i = 21 is 10 iterations (i starts from 1 and increments by 2 for using as xpath)
        if (i <= 21)
            element = await waitForXPathAndReturnElements(page, xPaths);
        else
            element = "TimeoutError";

        let stockDetails = undefined;

        // Extract the stock details if element is not TimeoutError
        if (element !== "TimeoutError")
            stockDetails = await getStockDetails(page, element);

        // Add the stock details to the stocks array
        if (stockDetails !== undefined)
            stocks.push(stockDetails);

        // Check if we need to click next for more rows
        // if the function returned a timout error (took too long to respond), that maybe because it scraped all the data in the current page
        if (element === 'TimeoutError') {

            let returnValue = await clickNext(page, 'body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(8) > a');

            i = 1;

            // If clickNext times out, it could be due to a network issue or reaching the page before the last page.
            // To handle this, we change the selector for the next button on the last page.
            if (returnValue === 'TimeoutError') {

                // When we reach the page before the last page, the selector of the Next button changes.
                // To handle this, we call the clickNext function again with a different selector.
                let nextPage = await clickNext(page, 'body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(5) > a');

                // If this returns a 'TimeoutError', it indicates that we have reached the last page
                if (nextPage === 'TimeoutError' || nextPage === undefined) {
                    break;
                }
            }
        } else {
            numberOfStocks++;
            i += 2; // Increment 'i' to move to the next row
        }
    }

    return stocks;

}