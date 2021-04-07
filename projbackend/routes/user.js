const express = require("express");
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//* Middleware
router.param("userId", getUserById);

//* getUser post route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
//* updateUser put route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
//* userPurchaseList get route
router.get("/order/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);


module.exports = router;