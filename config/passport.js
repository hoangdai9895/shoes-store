const GooogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/Users");

module.exports = passport => {
    passport.use(
        new GooogleStrategy({
                clientID: process.env.googleClientID,
                clientSecret: process.env.googleClientSecret,
                callbackURL: "/auth/google/callback",
                proxy: true
            },
            (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                const image = profile.photos[0].value;
                const newUser = {
                    googleID: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    email: profile.emails[0].value,
                    image: image
                };

                User.findOne({
                        googleID: profile.id
                    })
                    .then(user => {
                        if (user) {
                            done(null, user);
                        } else {
                            new User(newUser).save().then(user => done(null, user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
    });
};