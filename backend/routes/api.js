import express from 'express';
const router = express.Router();
import { cmcListingLatestURL } from '../config.js';

router.get(cmcListingLatestURL, async (req, res) => {
    try {
        // Your logic for fetching data or performing actions
        const data = await YourModel.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

export default router;
