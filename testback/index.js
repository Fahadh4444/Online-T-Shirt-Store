const express = require("express");

const app = express();

const port = 3030;

const admin = (req, res) => {
    return res.send("This is Admin")
};


app.get("/", (req, res) => {
    return res.send("You are here finally!!!");
});


const isAdmin = (req, res, next) => {
    console.log("isAdmin is running");
    next();
};

app.get("/admin", isAdmin, admin);//We can craft code that if isAdmin is true then only next() will be returned otherwise, we stop the request.


app.get("/login", (req, res) => {
    return res.send("You are here finally to login!!!");
});

app.get("/signup", (req, res) => {
    return res.send("You are here finally to signup!!!");
});

app.get("/logout", (req, res) => {
    return res.send("Bye!!!");
});

app.listen(port, () => {
    console.log("Sever is up and running");
});