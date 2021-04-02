const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//* SIGNUP
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


//* SINGNIN
exports.signin = (req,res) => {
    const { email, password } = req.body;
    //? Checking Error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    };
    //? Fetching user from database using findone
    //? checking email
    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "User does not exists"
            });
        };
        // console.log(user.autheticate(password));
        //? Checking Password
        if(!user.autheticate(password)){
            return res.status(401).json({
                error: "Email and Password do not match"
            });
        };
        // console.log(user.securePassword(password));
        //? Create TOKEN by MAJIDH
        const token = jwt.sign({_id: user._id}, process.env.SECRET);
        //? Put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //? Send response to front end
        const {_id, name, email, role} = user;
        return res.json({token, user: { _id, name, email, role}});
    });

};


//* SIGNOUT
exports.signout = (req, res) => {
    //? Clearing Cookies using body-parser
    res.clearCookie("token");
    res.json({
        message: "User Signout successfully"
    });
};


//* PROTECTED ROUTES
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
});


//* CUSTOM MIDDLEWARES
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id === req.auth._id;
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED"
        });
    };
    next();
};
exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){
        return res.status(403).json({
            error: "You are not ADMIN, Access Denied"
        });
    }
    next();
};