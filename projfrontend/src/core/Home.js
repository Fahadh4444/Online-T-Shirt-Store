import React from 'react';
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

const Home = () => {
    console.log("API IS ", API);
    return (
        <Base title="Home Page" description="Welecome to T-Shirt Store">

        </Base>
    );
};

export default Home;