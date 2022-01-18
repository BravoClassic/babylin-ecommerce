import axios from "axios"
import { CART_ADD_ITEM, SAVE_CART_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { CART_DELETE_ITEM } from "../constants/cartConstants";
export const addToCart = (productId, quantity) => async (dispatch,getState) =>{
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            quantity
        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const deleteFromCart = (productId) => async (dispatch,getState) =>{
    dispatch({
        type: CART_DELETE_ITEM,
        payload: productId
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data) => (dispatch) =>{
    dispatch({type:SAVE_CART_SHIPPING_ADDRESS,payload:data});
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}