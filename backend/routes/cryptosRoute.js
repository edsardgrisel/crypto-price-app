import express from 'express';
import { Crypto } from "../models/cryptoModel.js"
import { cmcListingLatestURL, cmcKEY, cmcKEYVALUE } from '../config.js';
import axios from 'axios';


const router = express.Router()


// Functionality for live price data --------------------------------
const fetchLivePriceData = async () => {
    try {
        const response = await axios.get(cmcListingLatestURL, {
            headers: {
                cmcKEY: cmcKEYVALUE,
            },
        });
        return response.data.data.map((crypto) => ({
            name: crypto.name,
            ticker: crypto.symbol,
            price: crypto.quote.USD.price,
        }));
    } catch (error) {
        console.error('Error fetching live price data:', error);
        throw error;
    }
};

router.put('/update-prices', async (req, res) => {
    try {
        // Fetch live price data
        const livePriceData = await fetchLivePriceData().map((crypto) => ({
            name: crypto.name,
            ticker: crypto.symbol,
            price: crypto.quote.USD.price,
        }));;

        for (const crypto of livePriceData) {
            await Crypto.findOneAndUpdate({ ticker: crypto.ticker }, { price: crypto.price });
        }

        res.json({ message: 'Crypto prices updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

//Post new crypto
router.post('/', async (request, response) => {
    try {

        if (!cryptoIsComplete(request.body)) {
            return response.status(400).send({
                message: 'Send all required fields: name, ticker',
            });
        }
        const newCrypto = {
            name: request.body.name,
            ticker: request.body.ticker,
        };

        const crypto = await Crypto.create(newCrypto)
        return response.status(201).send(crypto)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Get all cryptos
router.get('/', async (request, response) => {
    try {
        const cryptos = await Crypto.find({})
        return response.status(200).json({
            count: cryptos.length,
            data: cryptos,

        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Get a crypto by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const crypto = await Crypto.findById(id);
        return response.status(200).json({
            data: crypto
        })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Update a crypto
router.put('/:id', async (request, response) => {
    try {
        if (!cryptoIsComplete(request.body)) {
            return response.status(400).send({
                message: 'Send all required fields: name, ticker',
            });
        }
        const { id } = request.params;

        const result = await Crypto.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: "Crypto not found" });
        }
        return response.status(200).send({ message: "Crypto updated succesfully" })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//Delete a crypto
router.delete('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const result = await Crypto.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: "Crypto not found" });
        }
        return response.status(200).send({ message: "Crypto deleted succesfully" })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});



function cryptoIsComplete(body) {
    return body && body.name && body.ticker
}

export default router;



// const livePriceData = [{
//     "id": 1,
//     "name": "Bitcoin",
//     "symbol": "BTC",
//     "slug": "bitcoin",
//     "num_market_pairs": 10782,
//     "date_added": "2010-07-13T00:00:00.000Z",
//     "tags": [
//         "mineable",
//         "pow",
//         "sha-256",
//         "store-of-value",
//         "state-channel",
//         "coinbase-ventures-portfolio",
//         "three-arrows-capital-portfolio",
//         "polychain-capital-portfolio",
//         "binance-labs-portfolio",
//         "blockchain-capital-portfolio",
//         "boostvc-portfolio",
//         "cms-holdings-portfolio",
//         "dcg-portfolio",
//         "dragonfly-capital-portfolio",
//         "electric-capital-portfolio",
//         "fabric-ventures-portfolio",
//         "framework-ventures-portfolio",
//         "galaxy-digital-portfolio",
//         "huobi-capital-portfolio",
//         "alameda-research-portfolio",
//         "a16z-portfolio",
//         "1confirmation-portfolio",
//         "winklevoss-capital-portfolio",
//         "usv-portfolio",
//         "placeholder-ventures-portfolio",
//         "pantera-capital-portfolio",
//         "multicoin-capital-portfolio",
//         "paradigm-portfolio",
//         "bitcoin-ecosystem",
//         "ftx-bankruptcy-estate"
//     ],
//     "max_supply": 21000000,
//     "circulating_supply": 19606268,
//     "total_supply": 19606268,
//     "infinite_supply": false,
//     "platform": null,
//     "cmc_rank": 1,
//     "self_reported_circulating_supply": null,
//     "self_reported_market_cap": null,
//     "tvl_ratio": null,
//     "last_updated": "2024-01-23T14:14:00.000Z",
//     "quote": {
//         "USD": {
//             "price": 38701.144626993475,
//             "volume_24h": 32052178224.799904,
//             "volume_change_24h": 68.6926,
//             "percent_change_1h": -0.56184888,
//             "percent_change_24h": -5.08530841,
//             "percent_change_7d": -9.61586802,
//             "percent_change_30d": -11.79138148,
//             "percent_change_60d": 2.56555835,
//             "percent_change_90d": 12.43971434,
//             "market_cap": 758785013463.5941,
//             "market_cap_dominance": 50.4919,
//             "fully_diluted_market_cap": 812724037166.86,
//             "tvl": null,
//             "last_updated": "2024-01-23T14:14:00.000Z"
//         }
//     }
// }]