const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const admin = require("../utils/admin");
const passport = require("passport");

// create order
router.post("/create", (req, res) => {
    const order = new Order(req.body);
    order
        .save()
        .then(order => res.json({ success: true, order }))
        .catch(err =>
            res.status(400).json({ errCreateOrder: "Some thing wrong !!!" })
        );
});

// get all order
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        Order.find({})
            .then(orders => res.status(200).json(orders))
            .catch(err => res.json({ err }));
    }
);

// get order by id
router.get("/:id", (req, res) => {
    Order.find({ _id: req.params.id })
        .then(order => {
            res.status(200).json({ success: true, order });
        })
        .catch(err =>
            res.status(404).json({ errOrderId: "Order no longer avaiable !!!" })
        );
});

//finished orders
router.post(
    "/finished",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        Order.findOne({ _id: req.body.id }).then(order => {
            if (order) {
                Order.findOneAndUpdate({ _id: req.body.id }, { $set: { isFinished: true } })
                    .then(order => {
                        res.json({ success: true, orderId: order._id });
                    })
                    .catch(err => res.status(400).json(err));
            }
        });
    }
);

// deleted order
router.post(
    "/delete",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        Order.findByIdAndRemove({ _id: req.body.id })
            .then(order =>
                res.status(200).json({ success: true, orderId: req.body.id })
            )
            .catch(err => res.status(400).json(err));
    }
);

module.exports = router;