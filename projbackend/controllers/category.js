const Category = require("../models/category");



//* Middleware
exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not fount in DB"
            });
        }
        req.category = category;
        next();
    })
}

//* createCategory Route Method
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in DB"
            });
        }
        res.json(category);
    });
};

//* getCategory Route Method
exports.getCategory = (req, res) => {
    return res.json(req.category);
};

//* getAllCategories Route Method
exports.getAllCategories = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "No Categories fpond in DB"
            });
        }
        res.json(categories);
    });
};