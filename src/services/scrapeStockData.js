import puppeteer from 'puppeteer';

// go to the website
export async function scrapeStockData() {

    try {
        const browser = await puppeteer.launch({ headless: false });

        // getting the first tab
        const page = (await browser.pages())[0];

        // indiainfoline.com - for stock recommendation data

        await page.goto('https://www.indiainfoline.com/stock-ideas');

        setTimeout(async () => {

            console.log("Waiting for 12 seconds");

            // close the popup button
            const popupCloseBtnXpath = '/html/body/app-root/app-new-lead-grid-form/div[1]/div/button/img';
            const popupCloseBtn = await page.waitForXPath(popupCloseBtnXpath);
            popupCloseBtn.click();

        }, 12000);

        // await browser.close();
    } catch (error) {
        throw error;
    }
}

scrapeStockData();