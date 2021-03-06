import { CART_ADD_ITEM, SAVE_CART_SHIPPING_ADDRESS,SAVE_PAYMENT_METHOD } from "../constants/cartConstants";
import { CART_DELETE_ITEM } from "../constants/cartConstants";
export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                };
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            };
        case SAVE_CART_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            };
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            };
        default:
            return state;
    }
}
