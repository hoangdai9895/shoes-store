const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// body parser middleaware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect db
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true }).then(() => console.log('Mongodb conected !!!')).catch(err => console.log(err))

// passport

// models
const Users = require('./models/Users');

// routes

app.get('/test', (req, res) => {
    Users.find({}).then((data) => {
        res.json(data)
    }).catch(err => console.log(err))
})

// server static asts ì in production
if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${port}`))