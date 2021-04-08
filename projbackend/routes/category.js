const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//* (Params)Middlewares
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//* createCategory POST Route
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
//* getCategory GET Route
router.get("/category/:categoryId", getCategory);
//* getAllCategories GET Route
router.get("/categories", getAllCategories);
//* updateCategory PUT Route
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
//* removeCategory DELETE Route
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory);

module.exports = router;