const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
require("dotenv").config();

const app = express();

const auth = require("./routes/auth");

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect db
mongoose
    .connect(process.env.MONGOURL, { useNewUrlParser: true })
    .then(() => console.log("Mongodb conected !!!"))
    .catch(err => console.log(err));

// passport
app.use(passport.initialize());
app.use(passport.session());

// passport config
require("./config/passport")(passport);

// models
const User = require("./models/Users");

// routes
app.use("/auth", auth);

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