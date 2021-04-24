import React from 'react';
import data from './data';

function App() {
  return (
    <div className="grid-container">
    <header className="row">
        <div>
            <a href="#">
                Babylin Consult</a>
        </div>
        <div>
            <a href="#" title="Cart"><i className="fas fa-shopping-cart"></i></a>
            <a href="#" title="Sign In"><i className="fas fa-sign-in-alt"></i></a>
        </div>
    </header>
    <main>
        <div className="row center">
            {
                data.products.map((product)=>(
                    <div key={product._id} className="card">
                <a href={`/products/${product._id}`}><img className="medium" src={product.image} alt={product.name} /></a>
                <div className="card-body">
                    <a href={`/products/${product._id}`}>
                        <h2>{product.name}</h2>
                    </a>
                    <div className="rating">
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                        <span><i className="fas fa-star"></i></span>
                    </div>
                    <div className="pricing">${product.price}</div>
                </div>
            </div>
                ))
            }
            
        </div>
    </main>
    <footer className="row center">All right reserved </footer>
</div>
  );
}

export default App;
