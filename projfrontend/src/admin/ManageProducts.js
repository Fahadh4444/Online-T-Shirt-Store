import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getAllProducts } from './helper/adminapicall';

import Base from '../core/Base';

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const l = products.length;

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setProducts(data)
                }
            });
    };

    useEffect(() => {
        preLoad();
    }, []);

    const deleteThisProduct = productId => {
        deleteProduct(user._id, token, productId)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    preLoad();
                }
            });
    };

    return (
        <Base title="Welcome admin" description="Manage products here">
            <Link className="btn btn-warning mb-3" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <h2 className="mb-4">All products</h2>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3 mb-4">Total {l} products</h2>
                    {products.map((product, index) => (
                        <div key={index} className="row text-center mb-2 ">
                            <div className="col-4">
                                <h3 className="text-white text-left">{product.name}</h3>
                            </div>
                            <div className="col-4">
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/product/update/productId`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div className="col-4">
                                <button onClick={() => {
                                    deleteThisProduct(product._id)
                                }} className="btn btn-danger">
                                    Delete
                                  </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Base>
    )
}

export default ManageProducts;