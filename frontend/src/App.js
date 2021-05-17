import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
    const cart = useSelector(state => state.cart);
    const {cartItems}=cart;
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
            <Link to="/signin" title="Sign In"><i className="fas fa-sign-in-alt"></i></Link>
        </div>
    </header>
    <main>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
       
    </main>
    <footer className="row center">All right reserved </footer>
</div>
</BrowserRouter>
  );
}

export default App;
