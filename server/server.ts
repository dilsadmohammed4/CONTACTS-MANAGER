import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRouter from "./router/contactRouter";
import groupRouter from "./router/groupRouter";
import userRouter from "./router/userRouter";
import {config} from "./config/config";
import { DBUtil } from "./db/DBUtil";

const app: Application = express();

//configure express to read the .env
dotenv.config({
    path: "./.env"
})

const port: number | undefined = Number(process.env.SERVER_PORT_NAME) || 9000;
const dbUrl: string | undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;

//configure express to read the form data / body
app.use(express.json());
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.status(200);
    res.json({
        msg: "Welcome to Express Server...."
    });
});

//Router configuration
app.use("/contacts", contactRouter);
app.use("/groups", groupRouter);
app.use("/users", userRouter);

if (port && dbUrl && dbName) {
    app.listen(port, () => {
        if (dbUrl && dbName) {
            DBUtil.connectToDb(dbUrl, dbName)
                .then((dbResponse) => {
                    console.log(dbResponse);
                })
                .catch((error) => {
                    console.error(error);
                    process.exit(0);
                });
        }
        console.log(`Server started at ${port}`);
    });
}




