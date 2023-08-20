import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {IContactsView} from "../../modules/contacts/models/IContactsView";
import {IGroupsView} from "../../modules/contacts/models/IGroupsView";
import * as contactAction from "../contacts/contacts.action"
import {ToastUtils} from "../../utils/ToastUtils";

export const contactFeature = "contactFeature";

export interface InitialState {
    loading: boolean,
    errorMessage: SerializedError,
    contacts: IContactsView[],
    contact: IContactsView,
    groups: IGroupsView[],
    group: IGroupsView
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    contacts: [] as IContactsView[],
    contact: {} as IContactsView,
    groups: [] as IGroupsView[],
    group: {} as IGroupsView
}

// reducer:if we're dealing with internal/local state.
// extra reducer:if we're dealing with external state like server connection and all.
export const contactSlice = createSlice({
    name: "contactSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {

        //Get all Contacts
        builder.addCase(contactAction.getAllContactsAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.getAllContactsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contacts = action.payload;
        }).addCase(contactAction.getAllContactsAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Unable to get the contacts from server!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //Get a Contacts
        builder.addCase(contactAction.getAContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.getAContactAction.fulfilled, (state, action) => {
            state.loading = false;
            state.contact = action.payload;
        }).addCase(contactAction.getAContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Unable to get the contact from server!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //Create a Contacts
        builder.addCase(contactAction.createContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.createContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtils.displaySuccessToast("Contact added successfully!")
        }).addCase(contactAction.createContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Unable to create the contact in server!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //update a Contacts
        builder.addCase(contactAction.updateContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.updateContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtils.displaySuccessToast("Contact updated successfully!")
        }).addCase(contactAction.updateContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Unable to update the contact in server!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //delete a Contacts
        builder.addCase(contactAction.deleteContactAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.deleteContactAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtils.displaySuccessToast("Contact deleted successfully!")
        }).addCase(contactAction.deleteContactAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Unable to delete the contact in server!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //get all groups
        builder.addCase(contactAction.getAllGroupsAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.getAllGroupsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.groups = action.payload;
        }).addCase(contactAction.getAllGroupsAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //get a group
        builder.addCase(contactAction.getAGroupAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(contactAction.getAGroupAction.fulfilled, (state, action) => {
            state.loading = false;
            state.group = action.payload;
        }).addCase(contactAction.getAGroupAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })
    }
})