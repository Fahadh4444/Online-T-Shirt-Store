const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');


exports.signup = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not Able To Save User In DB"
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id
        });
    });
};


exports.signin = (req,res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    };

    User.findOne({email}, (err, user) => {
        if(err){
            res.status(400).json({
                error: "User does not exists"
            });
        };

        if(!user.autheticate(password)){
            res.status(401).json({
                error: "Email and Password do not match"
            });
        };

        //? Create TOKEN by MAJIDH
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //? Put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //? Send response to front end
        const {_id, name, email, role} = user;
        return res.json({token, user: { _id, name, email, role}});
    });

};


exports.signout = (req, res) => {
    res.json({
        message: "User Signout"
    });
};