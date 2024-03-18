import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Code } from "./models/CodeModel.js";
import codesRouter from './routes/codesRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST','DELETE','PUT'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));

app.get('/', (req, res) => {
    console.log("Hi I am tirth");
    return res.status(234).send("Oy hoy!");
});

app.use('/codes', codesRouter);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("DataBase is successsfully connected");
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });

    })
    .catch((err) => {
        console.log(err);
    });
