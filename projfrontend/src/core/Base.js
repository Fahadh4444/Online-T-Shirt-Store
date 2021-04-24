import React from 'react';
import Menu from "./Menu";


const Base = ({
    title = "My Title",
    description = "My description",
    className = "bg-dark text-white py-4 mb-1 text-center",
    children
}) => {
    return (
        <div>
            <Menu />
            <div className="container">
                <div className="jumbotron bg-dark text-white text-center mb-3 py-4">
                    <h2 className="diaplay-4">{title}</h2>
                    <p className="muted">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid text-white text-center py-3" style={{ backgroundColor: "#040B14" }}>
                    <h4>If you got any questions feel free to reach us</h4>
                    <button className="btn btn-lg" style={{ backgroundColor: "#FFA500" }} >Contact US</button>
                </div>
                <div className="container text-center">
                    <span className="text-muted">
                        An Amazing <span className="text-white">MERN</span> BootCamp
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Base;