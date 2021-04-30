import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom"

import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

import ImageHelper from './helper/ImageHelper';

const Card = ({
    ml,
    mr,
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f,
    reload = undefined
}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count)

    const cartTitle = product ? product.name : "A Photo from FF";
    const cartDescription = product ? product.description : "Default Description";
    const cartPrice = product ? product.price : "DEFAULT";

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddtoCart = (addtoCart) => {
        return (
            addtoCart && (
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        );
    }

    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFromCart(product._id);
                        setReload(!reload)
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    return (
        <div className="card text-white bg-dark border  " style={{ marginLeft: ml, marginRight: mr }}>
            <div className="card-header lead">{cartTitle}</div>
            <div className="card-body">
                {getARedirect(redirect)}
                <ImageHelper product={product} />
                <p className="lead bg-warning font-weight-normal text-wrap" style={{ color: "black", fontWeight: "450" }}>
                    {cartDescription}
                </p>
                <p className="btn btn-warning rounded  btn-sm px-4">$ {cartPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddtoCart(addtoCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;