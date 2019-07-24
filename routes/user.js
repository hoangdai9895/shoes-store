const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

// Register ==================================
router.post("/register", (req, res) => {
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ errEmail: "Email already exists !!" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// Login =========================
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(400).json({ errUser: "User not found!!!" });
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    email: user.email
                };
                jwt.sign(
                    payload,
                    process.env.secretOrKey, { expiresIn: 3600 },
                    (err, token) => {
                        if (err) res.json(err);
                        res.json({ success: true, token: `Bearer ${token}` });
                    }
                );
            } else {
                return res.status(400).json({ errPassword: "Password incorrect" });
            }
        });
    });
});

// get user information
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findById({ _id: req.body.id })
            .then(user => res.status(200).json({ success: true, user }))
            .catch(err => res.status(404).json(err));
    }
);

// update name
router.post(
    "/name",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        User.findByIdAndUpdate(req.body.id, { name: req.body.name })
            .then(user => res.status(200).json({ user }))
            .catch(err => res.status(404).json(err));
    }
);

//update password
router.post(
    "/password",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const id = req.body.id;
        let newpassword = req.body.newpassword;
        const currentpassword = req.body.currentpassword;
        // console.log(id, currentpassword);
        User.findById(id)
            .then(user => {
                // console.log(user);
                bcrypt
                    .compare(currentpassword, user.password)
                    .then(match => {
                        if (!match) {
                            res.status(400).json({ errNewPassword: "Password incorrect" });
                        } else {
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newpassword, salt, (err, hash) => {
                                    if (err) throw err;
                                    newpassword = hash;
                                    User.findByIdAndUpdate(id, { password: newpassword })
                                        .then(user => res.json({ success: true, user }))
                                        .catch(err => res.status(404).json(err));
                                });
                            });
                        }
                    })
                    .catch(err => res.status(404).json(err));
            })
            .catch(err => res.status(404).json(err));
    }
);

module.exports = router;