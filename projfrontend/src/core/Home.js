import React from 'react';

import "../styles.css";

import { API } from "../backend";

import Base from "./Base";
import Card from './Card';

const Home = () => {

    console.log("API IS ", API);

    return (
        <Base title="Home Page" description="Welecome to T-Shirt Store">
            <div className="row">
                <div className="col-4">
                    <Card ml="9px" />
                </div>
                <div className="col-4">
                    <Card />
                </div>
                <div className="col-4">
                    <Card mr="9px" />
                </div>
            </div>
        </Base>
    );
};

export default Home;