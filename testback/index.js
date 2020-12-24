const express = require("express");

const app = express();

const port = 3030;

app.get("/", (req,res) => {
    return res.send("You are here finally!!!");
});

app.get("/login", (req,res) => {
    return res.send("You are here finally to login!!!");
});

app.get("/signup", (req,res) => {
    return res.send("You are here finally to signup!!!");
});

app.get("/logout", (req,res) => {
    return res.send("Bye!!!");
});

app.listen(port, () => {
    console.log("Sever is up and running");
});