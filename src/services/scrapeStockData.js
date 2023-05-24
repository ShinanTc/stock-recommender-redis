import puppeteer, { Keyboard } from 'puppeteer';

// go to the website
export async function scrapeStockData() {

    try {
        // const browser = await puppeteer.launch({ headless: false });
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


            // go to the very last page
            await page.waitForSelector('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
            const element = await page.$('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
            await element.scrollIntoView();
            await page.evaluate(el => el.click(), element);

            console.log('Clicking "Last" button successfull');


            // get the total no of pages
            await page.waitForXPath('/html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/div/app-pagination/div/ngb-pagination/ul/li[4]/a');
            const elt = await page.$x('/html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/div/app-pagination/div/ngb-pagination/ul/li[4]/a');
            let totalNumberOfPages = await page.evaluate(el => el.textContent, elt[0]);

            // getting only the number from the string
            totalNumberOfPages = totalNumberOfPages.split(' ')[1].trim();  // trim - for removing whitespaces

            // converting string to integer
            totalNumberOfPages = parseInt(totalNumberOfPages);

            console.log("Gathered total no of pages");



            // let i = 1;

            // acting as a database
            // let stockTickerSymbolArr = [];

            // while (i < 20) {

            //     // getting the stock ticker symbol (Eg: TATAPOWER)
            //     let stockTickerSymbolXpath = await page.$x(`//*[@id="myGroup"]/tr[${i}]/td[1]/span[1]`); // Replace "//xpath/here" with your desired XPath expression
            //     let stockTickerSymbol = await page.evaluate(el => el.textContent, stockTickerSymbolXpath[0]);

            //     stockTickerSymbol = stockTickerSymbol.split(' ')[0].trim();

            //     stockTickerSymbolArr.push(stockTickerSymbol);

            //     i += 2;

            // }


            // console.log('stockTickerSymbolArr');
            // console.log(stockTickerSymbolArr);

        }, 12000);

        // xpath of stock names
        //*[@id="myGroup"]/tr[1]/td[1]/span[1]
        //*[@id="myGroup"]/tr[3]/td[1]/span[1]
        //*[@id="myGroup"]/tr[5]/td[1]/span[1]
        // ...
        //*[@id="myGroup"]/tr[19]/td[1]/span[1]

    } catch (error) {
        throw error;
    }
}

scrapeStockData();