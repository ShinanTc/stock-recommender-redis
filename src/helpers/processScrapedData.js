// process the scraped data based on the user's affordability and similar stuff

// remove stockdatas which has NaN values in it
async function removeNaNvalues(stockData) {
    stockData = stockData.filter((data) => {
        const values = data.split('|');
        return values.every((value) => !isNaN(value));
    });

    return stockData;
}

removeNaNvalues();