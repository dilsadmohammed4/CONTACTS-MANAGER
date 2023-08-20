import {Router, Request, Response} from "express";
import * as contactController from "../controller/contactController";
import {body} from "express-validator";
import {tokenMiddleware} from "../middleware/tokenMiddleware";

const contactRouter: Router = Router();

/**
 @usage  : Get all contacts
 @method  : GET
 @params  : no-params
 @url  : http://localhost:9999/contacts/
 */
contactRouter.get("/", tokenMiddleware, async (request: Request, response: Response) => {
    await contactController.getAllContacts(request, response);
});

/**
 @usage  : Get a contact
 @method  : GET
 @params  : contactId
 @url  : http://localhost:9999/contacts/:contactId
 */
contactRouter.get("/:contactId", tokenMiddleware, async (request: Request, response: Response) => {
    await contactController.getContact(request, response);
});

/**
 @usage  : Create a contact
 @method  : POST
 @params  : no-params
 @url  : http://localhost:9999/contacts/
 */
contactRouter.post("/", tokenMiddleware, [
    body('name').not().isEmpty().withMessage("Name is required.."),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required.."),
    body('email').not().isEmpty().withMessage("email is required.."),
    body('mobile').not().isEmpty().withMessage("mobile is required.."),
    body('company').not().isEmpty().withMessage("company is required.."),
    body('title').not().isEmpty().withMessage("title is required.."),
    body('groupId').not().isEmpty().withMessage("groupId is required..")
], async (request: Request, response: Response) => {
    await contactController.createContact(request, response);
});

/**
 @usage  : Update a contact
 @method  : PUT
 @params  : contactId
 @url  : http://localhost:9999/contacts/:contactId
 */
contactRouter.put("/:contactId", tokenMiddleware, [
    body('name').not().isEmpty().withMessage("Name is required.."),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required.."),
    body('email').not().isEmpty().withMessage("email is required.."),
    body('mobile').not().isEmpty().withMessage("mobile is required.."),
    body('company').not().isEmpty().withMessage("company is required.."),
    body('title').not().isEmpty().withMessage("title is required.."),
    body('groupId').not().isEmpty().withMessage("groupId is required..")
], async (request: Request, response: Response) => {
    await contactController.updateContact(request, response);
});

/**
 @usage  : Delete a contact
 @method  : Delete
 @params  : contactId
 @url  : http://localhost:9999/contacts/:contactId
 */
contactRouter.delete("/:contactId", tokenMiddleware, async (request: Request, response: Response) => {
    await contactController.deleteContact(request, response);
});
export default contactRouter;
