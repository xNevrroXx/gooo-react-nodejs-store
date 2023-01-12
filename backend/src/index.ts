import {Application} from "express";

const router = require("./router/index");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App is listening on url: http://localhost:${PORT}`);
        })
    }
    catch (error) {
        console.log(error);
    }
}

start();