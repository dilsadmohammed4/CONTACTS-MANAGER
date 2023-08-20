import {Router, Request, Response} from "express";
import {body} from "express-validator";
import * as userController from '../controller/userController'
import {tokenMiddleware} from '../middleware/tokenMiddleware'

const userRouter: Router = Router();

/**
 @usage  : Register a user
 @method  : POST
 @params  : username, email, password
 @url  : http://localhost:9999/users/register
 */
userRouter.post("/register", [
    body('username').not().isEmpty().withMessage("Username is required.."),
    body('email').isEmail().withMessage("Proper email is required.."),
    body('password').isStrongPassword().withMessage("Password is not strong..")
], async (request: Request, response: Response) => {
    await userController.registerAUser(request, response);
});

/**
 @usage  : Register a user
 @method  : POST
 @params  : email, password
 @url  : http://localhost:9999/users/login
 */
userRouter.post("/login", [
    body('email').isEmail().withMessage("Proper email is required.."),
    body('password').isStrongPassword().withMessage("Password is not strong..")
], async (request: Request, response: Response) => {
    await userController.loginUser(request, response);
});

/**
 @usage  : Get user info
 @method  : GET
 @params  : no-param
 @url  : http://localhost:9999/users/me
 */
userRouter.get("/me", tokenMiddleware, async (request: Request, response: Response) => {
    await userController.getUserInfo(request, response);
});

export default userRouter;
