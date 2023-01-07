import {Express} from "express";
import routes from "./routes/routes";
import {MysqlError, Pool, PoolConnection} from "mysql";

const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const cors = require("cors");

dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE,
    DB_USER = process.env.DB_USER,
    DB_PASSWORD = process.env.DB_PASSWORD,
    DB_HOST = process.env.DB_HOST,
    DB_PORT = process.env.DB_PORT;

const db: Pool = mysql.createPool({
    connectionLimit: 100,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD
})

db.getConnection((error: MysqlError, connection: PoolConnection) => {
    if(error) {
        throw error;
    }

    console.log("DB connected successfully: " + connection.threadId);
})

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

routes(app, db);

app.listen(PORT, () => {
    console.log(`App is listening on url: http://localhost:${PORT}`);
})