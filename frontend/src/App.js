import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo} = userSignin;
    const signoutHandler = () => {
        dispatch(signout());
    }
  return (
      <BrowserRouter>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link to="/">Babylin Consult</Link>
        </div>
        <div>
            <Link to="/cart" title="Cart"><i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            {/* {<i className="fas fa-sign-out-alt"></i> */
            userInfo ? 
            <div className="dropdown">
            <Link to="#">{userInfo.name}</Link> 
            <div className="dropdown-content">
                <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
            </div>
            </div>
            : 
            <Link to="/signin" title="Sign In"><i className="fas fa-sign-in-alt"></i></Link>
            }
        </div>
    </header>
    <main>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeOrder" component={PlaceOrderScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
       
    </main>
    <footer className="row center">All right reserved </footer>
</div>
</BrowserRouter>
  );
}

export default App;
