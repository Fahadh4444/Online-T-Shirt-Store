const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("productId", getProductById);

//* createProduct POST Route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
//* getProduct GET Route
router.get("/product/:productId", getProduct);
//* Middleware Route to load photo in background
router.get("/product/photo/:productId", photo);
module.exports = router;