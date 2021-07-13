import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { cartEmpty, loadCart } from './helper/CartHelper';
import { getMeToken, processPayment } from './helper/PaymentBHelper';
import { createOrder } from './helper/OrderHelper';

import { isAuthenticated } from '../auth/helper';

import DropIn from "braintree-web-drop-in-react";



const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token).then(info => {
            console.log(userId, token);
            console.log("INFORMATION", info);
            if (info.error) {
                setInfo({ ...info, error: info.error })
            } else {
                const clientToken = info.clientToken;
                setInfo({ clientToken })
            }
        })
    }

    const showBTDropIn = () => {
        return (
            <div style={{ marginRight: "18px" }}>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        />
                        <button className="btn w-100 btn-outline-warning" onClick={onPurchase} >Buy</button>
                    </div>
                ) : (
                    <h3>
                        Please LogIn or Add some thing to cart!!!
                    </h3>
                )}
            </div>
        )
    }

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getAmount()
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        setInfo({ ...info, success: response.success, loading: false })
                        console.log("PAYMENT SUCCESS!!!");
                        console.log(response);
                        const orderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount
                        };
                        createOrder(userId, token, orderData);
                        cartEmpty(() => {
                            console.log("Did we got a crash?");
                        })
                        setReload(!reload);
                    })
                    .catch(err => {
                        setInfo({ loading: false, success: false })
                        console.log("PAYMENT FAILED@@@");
                    })
            })
    }

    const getAmount = () => {
        let ammount = 0;
        products.map(p => {
            ammount = ammount + p.price
        })
        return ammount;
    }

    return (
        <div>
            <h3>
                Your Purchase Bills is {getAmount()} $
            </h3>
            {showBTDropIn()}
        </div>
    );
};

export default Paymentb;

// https://sandbox.braintreegateway.com/merchants/3g388rgnrjkgftwb/home
// https://developer.paypal.com/braintree/docs/guides/credit-cards/testing-go-live?q=#test-value-378282246310005