import {createAsyncThunk} from "@reduxjs/toolkit";
import {IContactsView} from "../../modules/contacts/models/IContactsView";
import {ContactService} from "../../modules/contacts/services/ContactService";
import {IGroupsView} from "../../modules/contacts/models/IGroupsView";
import {AuthUtils} from "../../utils/AuthUtils";

/*
 *  Get All Contacts
*/
export const getAllContactsAction: any = createAsyncThunk('contacts/getAllContactsAction', async (payload: {}, {rejectWithValue}): Promise<IContactsView[] | any> => {
    try {

        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.getAllContacts();
            return response.data
        }
    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});

/*
 *  Get a Contact
*/
export const getAContactAction: any = createAsyncThunk('contacts/getAContactAction', async (payload: {
    contactId: string
}, {rejectWithValue, dispatch}): Promise<IContactsView[] | any> => {
    try {
        const {contactId} = payload;
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.getAContact(contactId);
            if (response && response.data) {
                dispatch(getAGroupAction({contact: response.data}))        //get the group information when we get the contact object
            }
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});

/*
 *  Create a Contact
*/
export const createContactAction: any = createAsyncThunk('contacts/createContactAction', async (payload: {
    contact: IContactsView
}, {rejectWithValue}): Promise<IContactsView | any> => {
    try {
        const {contact} = payload;
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.createContact(contact);
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});

/*
 *  Update a Contact
*/
export const updateContactAction: any = createAsyncThunk('contacts/updateContactAction', async (payload: {
    contact: IContactsView, contactId: string
}, {rejectWithValue}): Promise<IContactsView | any> => {
    try {
        const {contact, contactId} = payload;
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.updateContact(contact, contactId);
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});

/*
 *  Update a Contact
*/
export const deleteContactAction: any = createAsyncThunk('contacts/deleteContactAction', async (payload: {
    contactId: string
}, {rejectWithValue, dispatch}): Promise<{} | any> => {
    try {
        const {contactId} = payload;
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.deleteContact(contactId);
            if (response && response.data) {
                dispatch(getAllContactsAction())    //get the fresh data when delete is success.
            }
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});


/*
 *  Get all groups
*/
export const getAllGroupsAction: any = createAsyncThunk('contacts/getAllGroupsAction', async (payload: {}, {rejectWithValue}): Promise<IGroupsView[] | any> => {
    try {
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.getAllGroups();
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});
/*
 *  Get a group
*/
export const getAGroupAction: any = createAsyncThunk('contacts/getAGroupAction', async (payload: {
    contact: IContactsView
}, {rejectWithValue}): Promise<IGroupsView | any> => {
    try {
        const {contact} = payload;
        if (AuthUtils.isSetTokenToRequestHeader()) {
            const response = await ContactService.getAGroup(contact);
            return response.data
        }

    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});

