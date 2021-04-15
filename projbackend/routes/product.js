const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, deleteProduct, updateProduct, getAllProducts, photo, getAllUniqueCategories } = require("../controllers/product")
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("productId", getProductById);

//* createProduct POST Route
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
//* getProduct GET Route
router.get("/product/:productId", getProduct);
//* deleteProduct DELETE Route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);
//* updateProduct PUT Route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
//* getAllProducts GET Route
router.get("/products", getAllProducts);
//* Middleware Route to load photo in background
router.get("/product/photo/:productId", photo);
//* getAllUniqueCategories GET Route
router.get("products/categories", getAllUniqueCategories);

module.exports = router;