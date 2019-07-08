const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const admin = require("../utils/admin");
const Type = require("../models/Type");
const router = express.Router();

// get type
router.get("/", (req, res) => {
    Type.find({})
        .then(type => res.json(type))
        .catch(err => res.status(400));
});

// create type
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    admin,
    (req, res) => {
        const type = new Type(req.body);
        type
            .save()
            .then(type => res.status(200).json({ success: true, type }))
            .catch(err => {
                res.status(400).json({ errCreateType: "Your Type was duplicated !!" });
            });
    }
);

module.exports = router;