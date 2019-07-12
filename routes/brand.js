const express = require("express");
const router = express.Router();
const Brand = require("../models/Brands");
const passport = require("passport");
const admin = require("../utils/admin");

// create new brand
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        const brand = new Brand(req.body);
        brand
            .save()
            .then(brand => res.json({ success: true, brand }))
            .catch(err => {
                res.status(400).json({ errCreateBrand: "Your brand was duplicated" });
            });
    }
);

// get all brands
router.get("/", (req, res) => {
    Brand.find({})
        .then(brands => res.json(brands))
        .catch(err => res.status(404).json({ err: err }));
});

module.exports = router;