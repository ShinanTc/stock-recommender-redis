import puppeteer, { Keyboard } from 'puppeteer';

// go to the website
export async function scrapeStockData() {

    try {
        const browser = await puppeteer.launch({ headless: false });
        // const browser = await puppeteer.launch({ headless: 'new' });

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


            // // go to the very last page
            // await page.waitForSelector('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
            // const lastPage = await page.$('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
            // await lastPage.scrollIntoView();
            // await page.evaluate(el => el.click(), lastPage);

            // console.log('Clicking "Last" button successfull');


            // get the total no of pages
            await page.waitForXPath('/html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/div/app-pagination/div/ngb-pagination/ul/li[4]/a');
            const numberOfPagesXpath = await page.$x('/html/body/app-root/div/app-stock-view-details/div/div/div[1]/div/div/div[3]/div/div/app-pagination/div/ngb-pagination/ul/li[4]/a');
            let totalNumberOfPages = await page.evaluate(el => el.textContent, numberOfPagesXpath[0]);

            // this means then the xpath of elements may have changed,
            // because totalNumberOfPages variable should have a number
            if (isNumber(totalNumberOfPages) === false) {
                console.error("ERROR : This is not a number");
            }

            // getting only the number from the string
            totalNumberOfPages = totalNumberOfPages.split(' ')[1]?.trim();

            // converting string to integer
            totalNumberOfPages = parseInt(totalNumberOfPages);

            console.log("Gathered total no of pages : " + totalNumberOfPages);

            // go back to the first page
            await page.waitForSelector('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(1) > a');
            const firstPage = await page.$('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(1) > a');
            await firstPage.scrollIntoView();
            await page.evaluate(el => el.click(), firstPage);

            console.log('Going to the first page successfull');



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

        // go to the very last page
        await page.waitForSelector('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
        const lastPage = await page.$('body > app-root > div > app-stock-view-details > div > div > div.col-lg-8 > div > div > div.row.stock-table-MT.ng-star-inserted > div > div > app-pagination > div > ngb-pagination > ul > li:nth-child(9) > a');
        await lastPage.scrollIntoView();
        await page.evaluate(el => el.click(), lastPage);

        console.log('Clicking "Last" button successfull');

    } catch (error) {
        throw error;
    }
}

scrapeStockData();

// check whether a given input is a number or not (not datatypes)
// this function will even take '42' and 40 as numbers
function isNumber(value) {
    return typeof value === 'number' || !isNaN(parseInt(value));
}





// xpath of stock names
//*[@id="myGroup"]/tr[1]/td[1]/span[1]
//*[@id="myGroup"]/tr[3]/td[1]/span[1]
//*[@id="myGroup"]/tr[5]/td[1]/span[1]
// ...
//*[@id="myGroup"]/tr[19]/td[1]/span[1]