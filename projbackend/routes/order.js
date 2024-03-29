const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//* createOrder POST Route
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderInPurchaseList, updateStock, createOrder);
//* getAllOrders GET Route
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);
//* getOrderStatus GET Route
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
//* updateStatus PUT Route
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;