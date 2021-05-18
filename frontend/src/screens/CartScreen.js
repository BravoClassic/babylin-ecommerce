import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    // const removeFromCartHandler = (id)={
    //     //delete acti0n
    // }
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity]);
    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <MessageBox>Cart is empty. <Link to="/">Go shopping</Link></MessageBox> :
                    (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <Link key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.quantity} onChange={e => dispatch(addToCart(item.product), Number(e.target.value))}>
                                                {
                                                                [...Array(item.countInStock).keys()].map(x => (
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                ))
                                                            }
                                                </select>
                                            </div>
                                            <div>
                                                ${item.price}
                                            </div>
                                            <div>
                                            {/* onClick={() =>removeFromCartHandler(item.product)} */}
                                                <button type="button" ><i class="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
