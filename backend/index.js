import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// utiles
import connectDB from "../backend/config/db.config.js";
import serverConfig from "../backend/config/server.config.js";
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"


dotenv.config();
const port = serverConfig.PORT || 5000;

connectDB()
    .then(res => console.log("succesfully connected to database"))
    .catch(err => console.log("Error connecting to database"))

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

app.listen(port, () => console.log(`Server listening on ${port}`));

export default app;