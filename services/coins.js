const config = require('config');
const axios = require('axios');

const getCoinsIdsNames = async ({ symbolList }) => {
    symbolsString = symbolList.join(',');

    try {
        const apiClient = axios.create({
            baseURL: config.get('coinmarketcap-api'),
            headers: {
                'X-CMC_PRO_API_KEY': config.get('coinmarketcap-api-key'),
                Accept: 'application/json',
            },
        });

        const coinMarketResult = await apiClient.get(
            `/cryptocurrency/map?symbol=${symbolsString}`
        );

        if (coinMarketResult && coinMarketResult.status !== 200) {
            throw new Error(
                `Error getting coins ids when calling Coin Market API`
            );
        }

        return coinMarketResult.data.data;
    } catch (error) {
        const errorMessage =
            error.response.data.error ??
            error.response.data.status.error_message;
        throw new Error(
            `Unexpected error calling Coin Market Api: ${errorMessage}`
        );
    }
};

const getMarketData = async ({ symbolList, currency = 'cad' }) => {
    const coinsNameList = await getCoinsIdsNames({ symbolList });

    const coinsIdsList = coinsNameList.map((iCoin) => {
        const nameLowerCase = iCoin.name.toLowerCase();
        return nameLowerCase.split(' ').join('-');
    });

    const coinsIdsString = coinsIdsList.join(',');

    try {
        const apiClient = axios.create({
            baseURL: config.get('coingecko-api'),
            headers: {
                'x-cg-demo-api-key': config.get('coingecko-api-key'),
                Accept: 'application/json',
            },
        });

        const coinGeckoResult = await apiClient.get(
            `/coins/markets?vs_currency=${currency}&ids=${coinsIdsString}`
        );

        if (coinGeckoResult && coinGeckoResult.status !== 200) {
            throw new Error(
                `Error getting coins market data when calling Coin Gecko API`
            );
        }

        const result = coinGeckoResult.data.map((iCoin) => {
            return {
                currency,
                name: iCoin.name,
                symbol: iCoin.symbol,
                currentPrice: iCoin.current_price,
                marketCap: iCoin.market_cap,
                marketCapRank: iCoin.market_cap_rank,
                price24hChange: iCoin.price_change_24h,
                priceChangePercentage24h: iCoin.price_change_percentage_24h,
                highestPrice24h: iCoin.high_24h,
                lowestPrice24h: iCoin.low_24h,
            };
        });

        return result;
    } catch (error) {
        const errorMessage = error.response.data.error ?? error.message;
        throw new Error(
            `Unexpected error calling Coin Gecko Api: ${errorMessage}`
        );
    }
};

module.exports = {
    getMarketData,
};
