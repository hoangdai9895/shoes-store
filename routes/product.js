const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const passport = require("passport");
const admin = require("../utils/admin");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");

// create product
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        // console.log(req.body);
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
    console.log(req.body.filters)
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // console.log(req.body.filters[key][0])
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
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

// upload image
router.post(
    "/uploadimage",
    passport.authenticate("jwt", { session: false }),
    admin,
    formidable(),
    (req, res) => {
        // console.log(req.files.file);
        cloudinary.uploader.upload(
            req.files.file.path,
            result => {
                // console.log(result);
                res.status(200).send({
                    public_id: result.public_id,
                    url: result.url
                });
            }, {
                folder: "shoes",
                resource_type: "auto"
            }
        );
    }
);

// delete file
router.post(
    "/removeimage",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        // let image_id = req.query.public_id;
        let image_id = req.body.id;
        // console.log(req.body.id);
        cloudinary.uploader.destroy(
            image_id,
            err => {
                if (err) return res.json({ success: false, error: err });
                res.status(200).send("ok");
            }, {
                folder: "shoes"
            }
        );
    }
);

module.exports = router;