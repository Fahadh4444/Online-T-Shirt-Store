import React, { useState, useEffect } from 'react';

import "../styles.css";

import { API } from "../backend";

import Base from "./Base";
import Card from './Card';
import Paymentb from './Paymentb';

import { loadCart } from './helper/CartHelper';



const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>
                    This Section is to Load Products
                </h2>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        ml="18px"
                        addtoCart={false}
                        removeFromCart={true}
                        setReload={setReload}
                        reload={reload}
                    />
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
        return (
            <div>
                <h2>
                    This Section is for Check out
                </h2>
            </div>
        )
    }

    return (
        <Base title="Cart Page" description="Read to Check Out">
            <div className="row">
                <div className="col-6">
                    {products.length > 0 ? loadAllProducts(products) : (<h3>No Products!!!</h3>)}
                </div>
                <div className="col-6">
                    <Paymentb products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    );
};

export default Cart;