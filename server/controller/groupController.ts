import {Request, Response} from "express";
import {APP_STATUS} from "../constant/constant";
import {validationResult} from "express-validator";
import GroupTable from "../database/groupsScema";
import {IGroup} from "../model/IGroup";
import mongoose from "mongoose";

export const createGroup = async (request: Request, response: Response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});
    }
    try {

        let {name} = request.body;

        //check if group name is already exits
        let group: IGroup | null | undefined = await GroupTable.findOne({name: name});
        if (group) {
            return response.status(500).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "Group name is already exist"
            });
        }

        let theGroup: IGroup | null | undefined = await new GroupTable({name: name}).save();
        if (theGroup) {
            return response.status(200).json(theGroup);
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}
export const getAllGroup = async (request: Request, response: Response) => {
    try {

        let groups: IGroup | any | undefined = await GroupTable.find();
        if (groups) {
            return response.status(200).json(groups);
        }
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}

export const getAGroup = async (request: Request, response: Response) => {
    try {

        let {groupId} = request.params;
        const mongoGroupId = new mongoose.Types.ObjectId(groupId);
        let theGroup: IGroup | any | undefined = await GroupTable.findById(mongoGroupId);
        if (!theGroup) {
            return response.status(404).json({
                status: APP_STATUS.FAILED,
                data: null,
                error: "No group is found"
            })
        }
        return response.status(200).json(theGroup);
    } catch (error: any) {
        return response.status(500).json({
            status: APP_STATUS.FAILED,
            data: null,
            error: error.message
        });
    }
}