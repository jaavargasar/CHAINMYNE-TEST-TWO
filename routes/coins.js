const express = require('express');

const router = express.Router();

const { getMarketData } = require('../services/coins');

router.post('/', async (req, res) => {
    const { symbols, currency } = req.body;

    if (!symbols) {
        throw new Error('Symbols array is required in the body request');
    }

    try {
        const result = await getMarketData({
            symbolList: symbols,
            currency,
        });
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({
            message: error.message,
        });
    }
});

module.exports = router;
