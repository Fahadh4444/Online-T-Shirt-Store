import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../auth/helper';
import { deleteCategory, getAllCategories } from './helper/adminapicall';

import Base from '../core/Base';

const ManageCategories = () => {

    const [categories, setCategories] = useState([]);
    const l = categories.length;

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setCategories(data)
                }
            });
    };

    useEffect(() => {
        preLoad();
    }, []);

    const deleteThisCategory = categoryId => {
        deleteCategory(user._id, token, categoryId)
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
            <h2 className="mb-4">All categories</h2>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3 mb-4">Total {l} categories</h2>
                    {categories.map((category, index) => (
                        <div key={index} className="row text-center mb-2 ">
                            <div className="col-4">
                                <h3 className="text-white text-left">{category.name}</h3>
                            </div>
                            <div className="col-4">
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/category/update/${category._id}`}
                                >
                                    <span className="">Update</span>
                                </Link>
                            </div>
                            <div className="col-4">
                                <button onClick={() => {
                                    deleteThisCategory(category._id)
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

export default ManageCategories;