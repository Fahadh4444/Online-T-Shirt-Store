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