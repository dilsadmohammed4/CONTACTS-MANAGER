import {Router, Request, Response} from "express";
import * as groupController from "../controller/groupController";

const contactRouter: Router = Router();

contactRouter.get("/", async (request: Request, response: Response) => {
    await groupController.getAllGroup(request, response);
});

contactRouter.post("/", async (request: Request, response: Response) => {
    await groupController.createGroup(request, response);
});

contactRouter.get("/:groupId", async (request: Request, response: Response) => {
    await groupController.getAGroup(request, response);
});

export default contactRouter;
