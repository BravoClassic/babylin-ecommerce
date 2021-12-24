import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart,deleteFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }
    const deleteFromCartHandler = (id)=>{
        //delete acti0n
        dispatch(deleteFromCart(id));
    }
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
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.quantity} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                {
                                                                [...Array(item.countInStock).keys()].map(
                                                                    (x) => (
                                                                    <option key={x+1} value={x+1}>
                                                                        {x+1}
                                                                    </option>
                                                                ))
                                                            }
                                                </select>
                                            </div>
                                            <div>
                                                ${item.price}
                                            </div>
                                            <div>
                                            
                                                <button type="button" onClick={() =>deleteFromCartHandler(item.product)} ><i className="fas fa-trash"></i></button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>Cart Total: ({cartItems.reduce((a,c)=> a + (c.quantity),0)} items): ${cartItems.reduce((a,c)=> a + (c.price) * (c.quantity),0)}</h2>
                        </li>
                        <li>
                            <button className="primary block" onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed to Checkout</button>
                        </li>
                    </ul> 
                </div>
            </div>
        </div>
    )
}
