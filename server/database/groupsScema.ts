import mongoose from "mongoose";
import {IGroup} from "../model/IGroup";

const groupSchema = new mongoose.Schema<IGroup>({
    name: {type: "String", required: true, unique: true}
}, {timestamps: true});
const GroupTable = mongoose.model<IGroup>('groups', groupSchema);
export default GroupTable;
