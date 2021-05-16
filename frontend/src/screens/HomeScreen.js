import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products');
                setLoading(false);
                setProducts(data);
            } catch (e) {
                setError(e.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {
            loading ? <LoadingBox></LoadingBox>
            : 
            error?<MessageBox variant="error">{error}</MessageBox>
            :
            <div className="row center">
            {
                products.map((product) => (
                    <Product key={product._id} product={product} ></Product>
                ))
            }

        </div>
        }
        </div>
        
    )
}
