const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//* (Param)Middleware
router.param("userId", getUserById);

//* getUser POST Route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//* updateUser PUT Route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
//* userPurchaseList GET Route
router.get("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;