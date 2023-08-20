import {Request, Response} from "express";
import {APP_STATUS} from "../constant/constant";
import {validationResult} from "express-validator";
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import UserTable from "../database/userScema";
import {IUser} from "../model/IUser";
import mongoose from "mongoose";

export const registerAUser = async (request: Request, response: Response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try {

        //read data form data
        let {username, email, password} = request.body;

        //check if user is exists
        const userObj: IUser | undefined | null = await UserTable.findOne({email: email});
        if (userObj) {
            return response.status(400).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "User is already exists!"
            });
        }

        //password encryption
        const salt: string = await bcryptjs.genSalt(10);
        const hashPassword: string = await bcryptjs.hash(password, salt);

        //gravetar url
        const imageUrl: string = gravatar.url(email, {
            size: "200",
            rating: "pg",
            default: "mm"
        })

        //save to db

        const newUser: IUser = {
            email: email,
            imageUrl: imageUrl,
            isAdmin: false,
            password: hashPassword,
            username: username

        }
        const theNewObj: IUser | undefined | null = await new UserTable(newUser).save();
        if (theNewObj) {
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: theNewObj,
                msg: "Registration successful!"
            });
        }

    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

export const loginUser = async (request: Request, response: Response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }

    try {

        //read form data
        let {email, password} = request.body;

        //check email exits
        const userObj: IUser | undefined | null = await UserTable.findOne({email: email});
        if (!userObj) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Invalid email address!"
            });
        }
        //check for password
        const isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Invalid password!"
            });
        }

        //create a token
        const secretKey: string | undefined = process.env.JWT_SECRET_KET;
        const payload: any = {
            user: {
                id: userObj._id,
                email: userObj.email
            }
        }
        if (secretKey && payload) {
            jwt.sign(payload, secretKey, {
                expiresIn: 1000 * 60 * 60
            }, (error, encoded) => {
                if (error) throw error;
                if (encoded) {
                    return response.status(200).json({
                        status: APP_STATUS.SUCCESS,
                        data: userObj,
                        token: encoded,
                        msg: "Login success"
                    });
                }
            })
        }

    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}


export const getUserInfo = async (request: Request, response: Response) => {

    try {
        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (userData){
            return response.status(200).json({
                status: APP_STATUS.SUCCESS,
                data: userData,
                msg:"User fetched.."
            });
        }

    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}
