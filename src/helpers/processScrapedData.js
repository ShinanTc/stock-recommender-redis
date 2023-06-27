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

// for getting the highest profitable trades from the scraped trades
export async function getHighestProfitableTrades(stockData) {
    let sortedData = stockData
        .map(data => {
            let target = data.split('|')[3];
            return {
                string: data,
                value: parseInt(target)
            };
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map(item => item.string);

    return sortedData;
}