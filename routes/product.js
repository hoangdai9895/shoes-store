const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const passport = require("passport");
const admin = require("../utils/admin");
const mongoose = require("mongoose");

// create product
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        const product = new Product(req.body);
        product
            .save()
            .then(product => res.status(200).json({ success: true, product }))
            .catch(err => res.status(400).json(err));
    }
);

// get all product

router.get("/", (req, res) => {
    Product.find({
            brand: ["5d1dd0add97f461578be41f0", "5d1dd0add97f461578be41f0"]
        })
        .populate("brand")
        .then(products => res.status(200).json({ success: true, products }))
        .catch(err => res.status(400).json(err));
});

//  get product filters
router.post("/shop", (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key[0]],
                    $lte: req.body.filters[key[1]]
                };
            } else findArgs[key] = req.body.filters[key];
        }
    }
    // console.log(req.body.filters);
    // console.log(findArgs);
    Product.find(findArgs)
        .populate("brand")
        .populate("wood")
        .sort([
            [sortBy, order]
        ])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: products.length,
                products
            });
        });
});

module.exports = router;