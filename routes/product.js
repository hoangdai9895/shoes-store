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
        const product = new Product(req.body);
        product
            .save()
            .then(product => res.status(200).json({ success: true, product }))
            .catch(err => res.status(400).json(err));
    }
);

// get all product

router.get("/", (req, res) => {
    Product.find({})
        .populate("brand")
        .then(products => res.status(200).json({ success: true, products, size: products.length }))
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
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };

            } else findArgs[key] = req.body.filters[key];
        }
    }
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
                console.log(result)
                res.status(200).send({
                    public_id: result.public_id,
                    url: result.secure_url
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

// get detail product
router.post('/shop/:id', (req, res) => {
    Product.find({ _id: req.body.id }).populate('brand').populate('type').then(product => {
        res.status(200).json({ success: true, product: product[0] })
    }).catch(err => {
        res.status(404).json({ errProductDetail: 'no product found ' })
    })
})

//delete product
router.post('/delete', passport.authenticate('jwt', { session: false }), admin, (req, res) => {
    // console.log(req.body.listImages.length === 0)
    if (req.body.listImages.length !== 0) {
        cloudinary.v2.api.delete_resources(req.body.listImages).then(results => {
            Product.findByIdAndRemove(req.body.id).then(product => {
                res.status(200).json({ success: true, product, results })
            }).catch(err => {
                res.status(404).json(err)
            })
        }).catch(err => res.status(400).json(err))
    } else {
        Product.findByIdAndRemove(req.body.id).then(product => {
            res.status(200).json({ success: true, product })
        }).catch(err => {
            res.status(404).json(err)
        })
    }

})


// update product
router.post('/update', passport.authenticate('jwt', { session: false }), admin, (req, res) => {
    Product.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        type: req.body.type,
        price: req.body.price,
        images: req.body.images
    }, { new: true }).then(product => {
        console.log(product)
        res.status(200).json({ success: true, product })
    }).catch(err => res.status(400).json(err))
})

module.exports = router;