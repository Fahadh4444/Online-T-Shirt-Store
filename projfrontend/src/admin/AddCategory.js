import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Base from "../core/Base";

import { isAuthenticated } from "../auth/helper/index";
import { createCategory } from "../admin/helper/adminapicall";

const AddCategory = () => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-3">
                <Link className="btn btn-sm btn-warning mb-3" to="/admin/dashboard">Admin Home</Link>
            </div>
        )
    }

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        //* BackEnd Request Fired
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError("");
                    setSuccess(true);
                    setName("");
                }
            });
    };

    const successMessage = () => {
        if (success) {
            return <h4 className="text-success">Category Created Successfully🥳🥳🥳</h4>
        }
    }

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-danger">Failed to create category😐😐😐</h4>

        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <p className="lead" style={{ fontWeight: "normal" }}>Enter The Category</p>
                    <input type="text"
                        className="form-control my-3"
                        onChange={handleChange}
                        value={name}
                        autoFocus
                        required
                        placeholder="For Ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-warning" style={{ color: "black" }}>Create Category</button>
                </div>
            </form>
        )
    }

    return (
        <Base
            title="Create a Category Here"
            description="Add a new category for new T-Shirt"
        >
            <div className="row" style={{ marginLeft: "9px", marginRight: "9px" }}>
                <div className="col-md-8 offset-md-2 text-dark bg-white rounded">
                    {successMessage()}
                    {warningMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;