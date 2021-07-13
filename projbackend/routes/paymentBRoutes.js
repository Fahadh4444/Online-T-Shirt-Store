const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");

//* (Params)Middlewares
router.param("userId", getUserById);

//* getToken GET Route
router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
//* processPayment POST Route
router.post("/payment/braintree/:userId", isSignedIn, isAuthenticated, processPayment);

module.exports = router;