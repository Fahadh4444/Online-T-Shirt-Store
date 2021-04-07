var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")

//* SIGNUP POST Route
router.post(
    "/signup",
    [
        check("name", "name sholud be atleast 3 char").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password sholud be atleast 3 char").isLength({ min: 3 })
    ],
    signup
);

//* SIGNIN POST Route
router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password is required").isLength({ min: 1 })
    ],
    signin
);

//* SIGNOUT GET Route
router.get("/signout", signout);

module.exports = router;