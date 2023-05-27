import puppeteer from 'puppeteer';

// go to the website
export async function scrapeStockData() {

    try {
        // const browser = await puppeteer.launch({ headless: false });
        const browser = await puppeteer.launch({ headless: 'new' });

        // getting the first tab
        const page = (await browser.pages())[0];

        // indiainfoline.com - for stock recommendation data

        console.log("Going to datasource...");

        await page.goto('https://www.indiainfoline.com/stock-ideas/');

        console.log("Waiting for pop-up");

        setTimeout(async () => {

            // close the popup button
            const popupCloseBtnXpath = '/html/body/app-root/app-new-lead-grid-form/div[1]/div/button/img';
            const popupCloseBtn = await page.waitForXPath(popupCloseBtnXpath);
            popupCloseBtn.click();

            console.log("Pop up closed");

            // counting number of stocks in the current page
            let numberOfStocks = 0;
            let i = 1; // Start with the initial value for `i`

            while (true) {

                let element = await waitForXPathAndReturnElements(page, `//*[@id="myGroup"]/tr[${i}]/td[1]/span[1]`);

                // if the function returned a timout error (took too long to respond)
                if (element === 'TimeoutError') {

                    let returnValue = await clickNext(page, 'body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(8) > a');

                    // If clickNext times out, it could be due to a network issue or reaching the page before the last page.
                    // To handle this, we change the selector for the next button on the last page.
                    if (returnValue === 'TimeoutError') {
                        let returnValue = await clickNext(page, 'body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(5) > a');

                        // If this returns a 'TimeoutError', it indicates that we have reached the last page.
                        if (returnValue === 'TimeoutError') {
                            break;
                        }

                    }

                } else {
                    numberOfStocks++;
                    i += 2; // Increment 'i' to move to the next row
                }

            }

            console.log("Outside of while loop");

        }, 12000);

    } catch (error) {
        throw error;
    }
}

scrapeStockData();


async function waitForXPathAndReturnElements(page, xPath) {

    try {
        await page.waitForXPath(xPath);
        const elements = await page.$x(xPath);
        return elements;
    } catch (error) {
        // Handle timeout error
        if (error.name === 'TimeoutError')
            return 'TimeoutError';
    }

}

// clicking 'Next' button (going to the Next page)
async function clickNext(page, selector) {
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