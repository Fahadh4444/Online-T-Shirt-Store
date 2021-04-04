const express = require("express");
const router = express.Router();

const { getUserById, getUser } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

//* Middleware
router.param("userId", getUserById);

//* getUser post route
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;