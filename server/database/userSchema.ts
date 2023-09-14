import mongoose from "mongoose";
import {IUser} from "../model/IUser";

const userSchema = new mongoose.Schema<IUser>({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    imageUrl: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
}, {timestamps: true});
const UserTable = mongoose.model<IUser>('users', userSchema);
export default UserTable;