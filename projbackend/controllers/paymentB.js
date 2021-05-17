const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "useYourMerchantId",
    publicKey: "useYourPublicKey",
    privateKey: "useYourPrivateKey"
});

//* getToken Route Method
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(response)
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