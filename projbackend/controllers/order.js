const { Order, ProductCart } = require("../models/order");

//* Middleware
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price") //! Don't put comma
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No Order found in DB"
            });
        };
        req.order = order;
        next();
    })
}

//* createOrder Route Method
exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if(err){
            return res.status(400).json({
                erroe: "Failed to save your order in DB"
            });
        };
        res.json(order);
    });
};

//* getAllOrders Route Method
exports.getAllOrders = (req, res) => {
    Order.findById()
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No Orders found in DB"
            });
        }
        res.json(order);
    });
};