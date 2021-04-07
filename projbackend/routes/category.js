const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategories } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("catergoryId", getCategoryById);

//* createCategory POST Route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
//* getCategory GET Route
router.get("/category/:categoryId", getCategory);
//* getAllCategories GET Route
router.get("/categories", getAllCategories);

module.exports = router;