const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51MuNmiLBh0LNTfwjWEMFW04Il0pjz7KD68mpU00PhJzTKrOFiIeN3LcuFQOQKNVgUMbdjXvf6jh07wJfnayyaGFo00Y8rRtQcA"
);

router.post("/payment", (req, res, next) => {
  console.log(req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeError, stripeResponse) => {
      console.log(stripeError, stripeResponse);
      if (stripeError) {
        res.status(500).json(stripeError);
      } else {
        res.status(200).json(stripeResponse);
      }
    }
  );
});

module.exports = router;
