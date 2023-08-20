import express, {Application, Request, Response} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRouter from "./router/contactRouter";
import groupRouter from "./router/groupRouter";
import userRouter from "./router/userRouter";
import {config} from "./config/config";

const app: Application = express();

//configure express to read the .env
dotenv.config({
    path: "./.env"
})

const hostName: string | undefined = process.env.SERVER_HOST_NAME;
const port: string | undefined = process.env.SERVER_PORT_NAME;

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

mongoose
    .connect(config.mongo.url, {retryWrites: true, w: 'majority'})
    .then(() => {
        console.log('Mongo connected successfully.');
        if (hostName && port) {
            app.listen(Number(port), hostName, () => {
                console.log(`Server started on Host ${hostName}:${port}`)
            })
        }
    }).catch((error) => console.error(error));





