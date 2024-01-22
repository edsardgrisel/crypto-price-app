import express from 'express';
import { Crypto } from "../models/cryptoModel.js"


const router = express.Router()

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