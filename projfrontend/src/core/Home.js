import React, { useState, useEffect } from 'react';

import "../styles.css";

import { API } from "../backend";

import Base from "./Base";
import Card from './Card';

import { getAllProducts } from './helper/coreapicalls';


const Home = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProducts(data);
                }
            })
    }

    useEffect(() => {
        loadAllProducts();
    }, [])

    return (
        <Base title="Home Page" description="Welecome to T-Shirt Store">
            <div className="row">
                <h1>All of T-Shirts</h1>
                <div className="row">
                    {products.map((product, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                <Card ml="18px" product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
};

export default Home;