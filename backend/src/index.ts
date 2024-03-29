import {Application} from "express";

import router from "./router/index";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/error-middleware";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/api", router); 
app.use(errorMiddleware);

app.get("*", function(request, response) {
    response.sendFile(path.join(__dirname, "public", "index.html"));
});

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