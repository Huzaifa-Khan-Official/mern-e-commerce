import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// utiles
import connectDB from "./config/db.config.js";
import serverConfig from "./config/server.config.js";


dotenv.config();
const port = serverConfig.PORT || 5000;

connectDB()
    .then(res => console.log("succesfully connected to database"))
    .catch(err => console.log("Error connecting to database"))

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => console.log(`Server listening on ${port}`));