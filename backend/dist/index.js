"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("./routes/routes"));
const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const cors = require("cors");
dotenv.config();
const DB_DATABASE = process.env.DB_DATABASE, DB_USER = process.env.DB_USER, DB_PASSWORD = process.env.DB_PASSWORD, DB_HOST = process.env.DB_HOST, DB_PORT = process.env.DB_PORT;
const db = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
});
db.getConnection((error, connection) => {
    if (error) {
        throw error;
    }
    console.log("DB connected successfully: " + connection.threadId);
});
const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
(0, routes_1.default)(app, db);
app.listen(PORT, () => {
    console.log(`App is listening on url: http://localhost:${PORT}`);
});
