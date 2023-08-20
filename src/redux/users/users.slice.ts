import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {IUserView} from "../../modules/users/models/IUserView";
import * as userAction from "../users/users.action"
import {ToastUtils} from "../../utils/ToastUtils";
import {TokenUtil} from "../../utils/TokenUtil";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean,
    errorMessage: SerializedError,
    user: IUserView,
    token: string,
    isAuthenticated: boolean
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as IUserView,
    token: "",
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState: initialState,
    reducers: {
        logoutAction: (state, action) => {
            state.user = {} as IUserView;
            state.token = "";
            TokenUtil.deleteToken();
            state.isAuthenticated = false;
            ToastUtils.displayInfoToast("Logged out!")
        }
    },
    extraReducers: (builder) => {

        //Register a user
        builder.addCase(userAction.registerUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userAction.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtils.displaySuccessToast("Registration is success!")
        }).addCase(userAction.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtils.displayErrorToast("Registration is failed!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })

        //Login user action
        builder.addCase(userAction.loginUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userAction.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.token = action.payload.token;
            TokenUtil.saveToken(action.payload.token);
            state.isAuthenticated = true;
            ToastUtils.displaySuccessToast("Login is success!")
        }).addCase(userAction.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUserView;
            state.token = "";
            TokenUtil.deleteToken();
            state.isAuthenticated = false;
            ToastUtils.displayErrorToast("Login is failed!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })
        //get user info
        builder.addCase(userAction.getUserInfoAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userAction.getUserInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.isAuthenticated = true;
            ToastUtils.displaySuccessToast("User details fetched!")
        }).addCase(userAction.getUserInfoAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUserView;
            ToastUtils.displayErrorToast("Get userinfo failed!");
            if (isRejectedWithValue(action)) {
                console.log(action.payload)
            }
        })
    }
});

export const {logoutAction} = userSlice.actions;
