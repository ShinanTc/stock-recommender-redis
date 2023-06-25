// process the scraped data based on the user's affordability and similar stuff

// remove stockdatas which has NaN values in it
export async function removeNaNvalues(stockData) {
    stockData = stockData.filter(data => {
        let values = data.split('|');

        for (let value of values) {
            if (value === 'NaN') {
                return false;
            }
        }

        return true;

    });

    return stockData;
}

export async function removeNonProfitableTrades(stockData) {
    stockData = stockData.filter(data => {
        let values = data.split('|');

        if (values[3] > 0) {
            return true;
        }

        return false;

    });

    return stockData;
}