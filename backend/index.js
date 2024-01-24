import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cryptosRoute from "./routes/cryptosRoute.js"
import cors from 'cors';
import apiRoutes from "./routes/api.js"
import { cmcListingLatestURL } from "./config.js";


const app = express();


//Middleware for parsing json
app.use(express.json());

app.use(cors());
// Middleware for handling CORS policy
// const urlList = ["http://localhost:3000", "http://localhost:5173/", "http://localhost:5555/", cmcListingLatestURL];
// app.use(cors(urlList));
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"]
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome")
});

app.use('/cryptos', cryptosRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    });