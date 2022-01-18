import { USER_SIGNIN_REQUEST,USER_SIGNIN_SUCCESS,USER_SIGNIN_FAILURE,USER_SIGNOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from "../constants/userConstants.js";
export const userSigninReducer = (state={}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return {
                loading: true
            };
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            };
        case USER_SIGNIN_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loading: true
            };
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload
            };
        case USER_REGISTER_FAILURE:
            return {
                loading: false,
                error: action.payload
            };
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}