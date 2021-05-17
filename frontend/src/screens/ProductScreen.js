import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [quantity, setQuantity] = useState(1)
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, products } = productDetails;
    useEffect(() => {
        dispatch(detailsProducts(productId));
    }, [dispatch, productId])
const addToCartHandler = ()=>{
    props.history.push(`/cart/${productId}?quantity=${quantity}`);
};
    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <MessageBox variant="error">{error}</MessageBox>
                        :
                        (<div>
                            <Link to="/" ><i className="fas fa-chevron-circle-left"></i></Link>
                            <div className="row top">
                                <div className="col-2">
                                    <img className="large" src={products.image} alt={products.name}></img>
                                </div>
                                <div className="col-1">
                                    <ul>
                                        <li>
                                            <h1>{products.name}</h1>
                                        </li>
                                        <li>
                                            <Rating rating={products.rating} numReviews={products.numReviews}></Rating>
                                        </li>
                                        <li>
                                            Price: ${products.price}
                                        </li>
                                        <li>
                                            Description: <p>{products.description}</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-1">
                                    <div className="card card-body">
                                        <ul>
                                            <li>
                                                <div className="row">
                                                    <div>Price</div>
                                                    <div className="price">${products.price}</div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div>Status:&nbsp;</div>
                                                    <div>{products.countInStock > 0 ? <span className="success">In Stock</span> : <span className="fail"> Out of Stock</span>}</div>
                                                </div>
                                            </li>
                                            {
                                                products.countInStock > 0 && (
                                                    <>
                                                    <li>
                                                        <div className="row">
                                                            <div>Quantity</div>
                                                            <div>
                                                        <select value={quantity} onChange={e => setQuantity(e.target.value)}>
                                                            {
                                                                [...Array(products.countInStock).keys()].map(x => (
                                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                                ))
                                                            }
                                                        </select>
                                                            </div>
                                                        </div>
                                                    </li>
                                                <li>
                                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                                </li>
                                                </>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>)
            }
        </div>


    );
}
