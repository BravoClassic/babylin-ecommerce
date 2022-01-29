import { USER_SIGNIN_FAILURE,USER_SIGNIN_SUCCESS, USER_SIGNIN_REQUEST, USER_SIGNOUT, USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_FAILURE } from "../constants/userConstants";
import Axios from "axios";

export const signin = (email, password) => async (dispatch) => {
    dispatch({type:USER_SIGNIN_REQUEST,payload:{ email, password}});
    try{
        const { data } = await Axios.post("/api/users/signin", { email, password });
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(e){
        dispatch({type:USER_SIGNIN_FAILURE,
            payload:  e.response && e.response.data.message ? e.response.data.message : e.message
        });
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    dispatch({type:USER_SIGNOUT});
}

export const register = (name,email, password) => async (dispatch) => {
    dispatch({type:USER_REGISTER_REQUEST,payload:{email, password}});
    try{
        const { data } = await Axios.post("/api/users/register", { name, email, password });
        dispatch({type:USER_REGISTER_SUCCESS,payload:data});
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    }
    catch(e){
        dispatch({type:USER_REGISTER_FAILURE,
            payload:  e.response && e.response.data.message ? e.response.data.message : e.message
        });
    }
}
