import puppeteer from 'puppeteer';

// go to the website
async function scrapeStockData() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // indiainfoline.com - for stock recommendation data

    await page.goto('https://www.google.com');
    console.log(await page.title());
    await browser.close();

}

// scrapeStockData();