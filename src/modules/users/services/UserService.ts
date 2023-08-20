import axios from "axios";
import {IUserView} from "../models/IUserView";

export class UserService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";


    /**
     @usage: Create a contact
     @method: POST
     @params: no-params
     @url: http://localhost:9000/contacts
     */

    public static registerUser(user: IUserView): Promise<{ data: { status: string, msg: string, data: IUserView } }> {
        const dataUrl: string = `${this.serverUrl}/users/register`;
        return axios.post(dataUrl, user)
    }


    /**
     @usage: Create a contact
     @method: POST
     @params: no-params
     @url: http://localhost:9000/contacts
     */

    public static loginUser(user: IUserView): Promise<{
        data: { status: string, msg: string, data: IUserView, token: string }
    }> {
        const dataUrl: string = `${this.serverUrl}/users/login`;
        return axios.post(dataUrl, user)
    }

    /**
     @usage: Create a contact
     @method: POST
     @params: no-params
     @url: http://localhost:9000/contacts
     */

    public static getUserInfo(): Promise<{ data: { status: string, msg: string, data: IUserView, token: string } }> {

        const dataUrl: string = `${this.serverUrl}/users/me`;
        return axios.get(dataUrl)
    }
}