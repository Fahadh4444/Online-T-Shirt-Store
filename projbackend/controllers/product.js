const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fileSystem = require("fs");

//* Middleware
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product Not Found"
                });
            }
            req.product = product;
            next();
        });
};

//* createProduct Route Method
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with Image"
            });
        }
        //* Destructure the field
        const { name, description, price, category, stock } = fields;
        //* Restrictions on filed
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Please include all fields"
            });
        };
        let product = new Product(fields);

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size too Big!"
                });
            }
            product.photo.data = fileSystem.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        };

        //*Saving to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving Product in DB failed"
                });
            }
            res.json(product);
        });
    });
};

//* getProduct Route Method
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//*MIddleWare
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    };
    next();
}

//* deleteProduct Route Method
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            });
        }
        res.json({
            message: "Deletion was seccessfull",
            deletedProduct
        });
    });
}

//* updateProduct Route Method
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with Image"
            });
        }

        //* Updation File
        let product = req.product;
        product = _.extend(product, fields);

        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File Size too Big!"
                });
            }
            product.photo.data = fileSystem.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type
        };

        //*Saving to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updating Product in DB failed"
                });
            }
            res.json(product);
        });
    });
}

//* getAllProducts Route Method
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 9;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No Product Found"
                });
            };
            res.json(products);
        });
}

//*getAllUniqueCategories Route Method
exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "No Category Foound"
            });
        };
        res.json(category);
    });
};

//* Middleware to update stock and sold in productmodel
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { stock: -product.count, sold: +product.count } }
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed !!!"
            });
        };
        next();
    });
};