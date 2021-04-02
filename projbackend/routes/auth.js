var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth")

//* SIGNUP post route
router.post(
    "/signup",
    [
        check("name", "name sholud be atleast 3 char").isLength({ min: 3 }),
        check("email", "email is required").isEmail(),
        check("password", "password sholud be atleast 3 char").isLength({ min: 3 })
    ],
    signup
);

//* SIGNIN post route
router.post(
    "/signin",
    [
        check("email", "email is required").isEmail(),
        check("password", "password is required").isLength({ min: 1 })
    ],
    signin
);

//* SIGNOUT get route
router.get("/signout", signout);


router.get("/testroute", isSignedIn, (req,res) => {
    res.json(req.auth);
});


module.exports = router;