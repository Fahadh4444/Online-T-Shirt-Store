import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Base from "../core/Base";

import { getAllCategories, createProduct } from "../admin/helper/adminapicall";
import { isAuthenticated } from '../auth/helper/index';

const AddProduct = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        err: false,
        createdProduct: "",
        getRedirect: false,
        formData: ""
    });

    const { name, description, price, stock, categories, category, loading, error, err, createdProduct, getRedirect, formData } = values;

    const preLoad = () => {
        getAllCategories().then(data => {
            //console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, categories: data, formData: new FormData() });
            }
        })
    }

    useEffect(() => {
        preLoad();
    }, []);

    const onSubmit = () => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, err: false })
                } else {
                    setValues({
                        ...values,
                        name: "",
                        description: "",
                        price: "",
                        photo: "",
                        stock: "",
                        category: "",
                        loading: false,
                        err: true,
                        createProduct: data.name
                    })
                }
            })
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({ ...values, [name]: value })
    };

    const successMessage = () => {
        return (
            <div className="alert alert-success mt-3" style={{ display: err ? "" : "none" }}>
                <h4>{createProduct} Created Successfully!!!</h4>
            </div>
        )
    }

    const createProductForm = () => (
        <form>
            <span className="mb-1">Post photo</span>
            <div className="form-group mb-3">
                <label className="btn btn-block btn-warning">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group mb-1">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group mb-1">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group mb-1">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group mb-1">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((c, index) => {
                            return (
                                <option key={index} value={c._id}>{c.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-group mb-3">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-warning mb-3"
            >
                Create Product
          </button>
        </form>
    );

    return (
        <Base
            title="Add a Product Here!!!"
            description="Product Creation Section"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-warning mb-4">Admin Home</Link>
            <div className="row text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;