const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const cloudinary = require("cloudinary");
require("dotenv").config();

const app = express();

const auth = require("./routes/user");
const brand = require("./routes/brand");
const type = require("./routes/type");
const product = require("./routes/product");

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect db
mongoose
    .connect(process.env.MONGOURL, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("Mongodb conected !!!"))
    .catch(err => console.log(err));

// passport
app.use(passport.initialize());
app.use(passport.session());

// set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// passport config
require("./config/passport")(passport);

// models
const User = require("./models/Users");
const Brand = require("./models/Brands");

// routes
app.use("/api/user", auth);
app.use("/api/brand", brand);
app.use("/api/type", type);
app.use("/api/product", product);

// test router
app.get("/test", (req, res) => {
    User.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => console.log(err));
});

// server static asts if in production
if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`));