import {Request, Response} from "express";
import {APP_STATUS} from "../constant/constant";
import {validationResult} from "express-validator";
import ContactTable from "../database/contactScema";
import {IContact} from "../model/IContact";
import mongoose from "mongoose";
import {IUser} from "../model/IUser";
import UserTable from "../database/userScema";

export const getAllContacts = async (request: Request, response: Response) => {
    try {
        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (!userData) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                msg: "User not found!"
            });
        }

        let contact: IContact[] = await ContactTable.find({user: new mongoose.Types.ObjectId(userId)});
        if (contact) {
            return response.status(200).json(contact)
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}
export const getContact = async (request: Request, response: Response) => {
    try {
        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (!userData) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                msg: "User not found!"
            });
        }

        let {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId); //string to mongo id
            const contact: IContact | undefined | null = await ContactTable.findOne({
                _id: mongoContactId,
                user: mongoUserId
            });
            if (!contact) {
                return response.status(404).json({
                    status: APP_STATUS.FAILED,
                    data: null,
                    error: "No contact found"
                });
            }
            return response.status(200).json(contact)
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}


export const createContact = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try {

        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (!userData) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                msg: "User not found!"
            });
        }

        //read thw form data
        let {name, imageUrl, email, mobile, company, title, groupId} = request.body;

        //check if the mobile exits
        let contact = await ContactTable.findOne({mobile: mobile});
        if (contact) {
            return response.status(400).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Mobile number already existed"
            })
        }

        //create

        let theContactObj: IContact = {
            user: userId,
            name: name,
            imageUrl: imageUrl,
            mobile: mobile,
            email: email,
            company: company,
            title: title,
            groupId: groupId
        }
        //send
        theContactObj = await new ContactTable(theContactObj).save();
        if (theContactObj) {
            return response.status(200).json(theContactObj)
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

export const updateContact = async (request: Request, response: Response) => {
    let {contactId} = request.params;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()})
    }
    try {
        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (!userData) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                msg: "User not found!"
            });
        }

        //read thw form data
        let {name, imageUrl, email, mobile, company, title, groupId} = request.body;
        const mongoContactId = new mongoose.Types.ObjectId(contactId); //string to mongo id

        let contact: IContact | undefined | null = await ContactTable.findOne({
            _id: mongoContactId,
            user: mongoUserId
        });

        //check if the mobile exits
        if (!contact) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Contact is not found"
            })
        }

        //update

        let theContactObj: IContact | null = {
            name: name,
            imageUrl: imageUrl,
            mobile: mobile,
            email: email,
            company: company,
            title: title,
            groupId: groupId
        }
        theContactObj = await ContactTable.findByIdAndUpdate(mongoContactId, {
            $set: theContactObj
        }, {new: true})
        if (theContactObj) {
            return response.status(200).json(theContactObj)
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

export const deleteContact = async (request: Request, response: Response) => {
    try {

        const userObj: any = request.headers['user-data'];
        const userId = userObj.id;
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        const userData: IUser | undefined | null = await UserTable.findById(mongoUserId);
        if (!userData) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                msg: "User not found!"
            });
        }

        let {contactId} = request.params;
        if (contactId) {
            const mongoContactId = new mongoose.Types.ObjectId(contactId); //string to mongo id
            let contact: IContact | undefined | null = await ContactTable.findOne({
                _id: mongoContactId,
                user: mongoUserId
            });
            if (!contact) {
                return response.status(404).json({
                    status: APP_STATUS.FAILED,
                    data: null,
                    error: "No contact found"
                });
            }
            const theContactObj: IContact | null = await ContactTable.findByIdAndDelete(mongoContactId);
            if (theContactObj) {
                return response.status(200).json(theContactObj)
            }
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}