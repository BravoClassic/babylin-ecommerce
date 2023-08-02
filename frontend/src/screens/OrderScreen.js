import Axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder} from '../actions/orderActions.js';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector((state) => state.orderDetails);
    const {order,loading,error} = orderDetails;
    const orderObj ={...order}.order;
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    console.log(orderObj);
    
    useEffect(() => {
        const addPaypalScript = async () => {
            const {data} = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script);
        }
        if(!orderId){
            dispatch(detailsOrder(orderId))
        }else{
            if(!orderObj.isPaid){
                if(!window.paypal){
                    addPaypalScript();
                }else{
                    setSdkReady(true)
                }
            }
        }

    }, [ dispatch, orderId,sdkReady,orderObj]);
    const successPaymentHandler = (payment) => {
        // console.log(payment);
        // const paymentData = {
        //     paymentMethod: payment.paymentMethod,
        //     paymentIntent: payment.paymentIntent,
        //     payerID: payment.payerID,
        //     paymentID: payment.paymentID,
        //     orderID: order._id
        // }
        // Axios.post('/api/paypal/success',paymentData)
        // .then(response => {
        //     console.log(response.data);
        //     dispatch(detailsOrder(orderId));
        // })
        // .catch(error => {
        //     console.log(error);
        // })
    }

    return loading ? (<LoadingBox></LoadingBox>):
    error ? (<MessageBox variant="error">{error}</MessageBox>):
    (
        <div>
            <h1>Order {order._id}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {orderObj.shippingAddress.fullName}<br/>
                                    <strong>Address:</strong> {orderObj.shippingAddress.address},{orderObj.shippingAddress.city},{orderObj.shippingAddress.postalCode},{orderObj.shippingAddress.country}
                                </p>
                                {orderObj.isDelivered ? <MessageBox variant="success">Delivered at {orderObj.deliveredAt}</MessageBox> : <MessageBox variant="error">Not Delivered</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong> {orderObj.paymentMethod}
                                </p>
                                {orderObj.isDelivered ? <MessageBox variant="success">Paid at {orderObj.paidAt}</MessageBox> : <MessageBox variant="error">Not Paid</MessageBox>}
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Summary</h2>
                                <ul>
                            {
                                orderObj.orderItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name}></img>
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                               {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                            </div>
                                            
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>Order Summary</li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${orderObj.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${orderObj.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${orderObj.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>
                                            Order Total
                                        </strong>
                                        </div>
                                    <div>${orderObj.totalPrice}</div>
                                </div>
                            </li>
                            {
                                !orderObj.isPaid && (
                                <li>
                                    {
                                        !sdkReady ? <LoadingBox></LoadingBox> : <PayPalButton amount={orderObj.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>
                                    }
                                </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
