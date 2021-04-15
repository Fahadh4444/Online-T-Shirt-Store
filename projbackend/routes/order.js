const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders } = require("../controllers/order");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//* createOrder POST Route
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
//* getAllOrders GET Route
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);



module.exports = router;