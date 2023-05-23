import puppeteer from 'puppeteer';

// go to the website
export async function scrapeStockData() {

    try {
        // const browser = await puppeteer.launch({ headless: true });
        const browser = await puppeteer.launch({ headless: 'new' });

        // getting the first tab
        const page = (await browser.pages())[0];

        // indiainfoline.com - for stock recommendation data

        console.log("Going to datasource...");

        await page.goto('https://www.indiainfoline.com/stock-ideas');

        console.log("Waiting for pop-up");

        setTimeout(async () => {

            // close the popup button
            const popupCloseBtnXpath = '/html/body/app-root/app-new-lead-grid-form/div[1]/div/button/img';
            const popupCloseBtn = await page.waitForXPath(popupCloseBtnXpath);
            popupCloseBtn.click();

            console.log("Pop up closed");

            const stockTickerSymbolXpath = await page.$x('//*[@id="myGroup"]/tr[1]/td[1]/span[1]'); // Replace "//xpath/here" with your desired XPath expression
            let stockTickerSymbol = await page.evaluate(el => el.textContent, stockTickerSymbolXpath[0]);

            // getting the stock ticker symbol (Eg: TATAPOWER)
            stockTickerSymbol = stockTickerSymbol.split(' ')[0].trim();

        }, 12000);

        // xpath of stock names
        //*[@id="myGroup"]/tr[1]/td[1]/span[1]
        //*[@id="myGroup"]/tr[3]/td[1]/span[1]
        //*[@id="myGroup"]/tr[5]/td[1]/span[1]

        // fullxpath of stock names
        // /html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/app-stock-view-items/div/div/table/tbody/tr[1]/td[1]/span[1]
        // /html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/app-stock-view-items/div/div/table/tbody/tr[3]/td[1]/span[1]
        // /html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/app-stock-view-items/div/div/table/tbody/tr[5]/td[1]/span[1]/html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/app-stock-view-items/div/div/table/tbody/tr[5]/td[1]/span[1]

        // await browser.close();
    } catch (error) {
        throw error;
    }
}

scrapeStockData();