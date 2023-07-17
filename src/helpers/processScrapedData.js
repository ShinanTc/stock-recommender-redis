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
        .map(item => item.string);

    return sortedData;
}

// turn the retrieved stockData into (key,value) format so that we can store it on redis
export async function turnIntoKeyValueFormat(stockData) {

    let newStockData = [];

    for (var data of stockData) {

        var obj = {
            key: data.split('|')[0],
            value: data
        };

        newStockData.push(obj);

    }

    return newStockData;

}