const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "3g388rgnrjkgftwb",
    publicKey: "mbnzt3g7mg2sjw4t",
    privateKey: "52e03863d793b79179e3cdaccf32c3c2"
});

//* getToken Route Method
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if (err) {
            res.status(400).json(err)
        } else {
            res.send(response)
        }
    });
};

//* processPayment Route Method
exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(result)
        }
    });
};