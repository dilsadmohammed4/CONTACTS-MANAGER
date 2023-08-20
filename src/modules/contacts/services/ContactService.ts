import axios from "axios";
import {IContactsView} from "../models/IContactsView";
import {IGroupsView} from "../models/IGroupsView";

export class ContactService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     @usage: get all contact
     @method: GET
     @params: no-params
     @url: http://localhost:9000/contacts
     */
    public static getAllContacts(): Promise<{ data: IContactsView[] }> {
        const dataUrl: string = `${this.serverUrl}/contacts`;
        return axios.get(dataUrl);
    }

    /**
     @usage: get a single contact
     @method: GET
     @params: no-params
     @url: http://localhost:9000/contacts/:contactId
     */

    public static getAContact(contactId: string): Promise<{ data: IContactsView }> {
        const dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.get(dataUrl)
    }

    /**
     @usage: Create a contact
     @method: POST
     @params: no-params
     @url: http://localhost:9000/contacts
     */

    public static createContact(contact: IContactsView): Promise<{ data: IContactsView }> {
        const dataUrl: string = `${this.serverUrl}/contacts`;
        return axios.post(dataUrl, contact)
    }

    /**
     @usage: Update a contact
     @method: PUT
     @params: no-params
     @url: http://localhost:9000/contacts:contactId
     */

    public static updateContact(contact: IContactsView, contactId: string): Promise<{ data: IContactsView }> {
        const dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.put(dataUrl, contact)
    }

    /**
     @usage: Create a contact
     @method: Delete
     @params: no-params
     @url: http://localhost:9000/contacts:contactId
     */

    public static deleteContact(contactId: string): Promise<{ data: {} }> {
        const dataUrl: string = `${this.serverUrl}/contacts/${contactId}`;
        return axios.delete(dataUrl)
    }

    /**
     @usage: get all groups
     @method: GET
     @params: no-params
     @url: http://localhost:9000/groups
     */
    public static getAllGroups(): Promise<{ data: IGroupsView[] }> {
        const dataUrl: string = `${this.serverUrl}/groups`;

        return axios.get(dataUrl);
    }

    /**
     @usage: get a group
     @method: GET
     @params: no-params
     @url: http://localhost:9000/groups/groupId
     */
    public static getAGroup(contact: IContactsView): Promise<{ data: IGroupsView }> {
        let {groupId} = contact;
        const dataUrl: string = `${this.serverUrl}/groups/${groupId}`;

        return axios.get(dataUrl);
    }

}