const express = require('express');
const https = require("https");
const fs = require("fs");
const app = express();
module.exports.app = app;

const cors = require('cors');

const searchHandler = require("./searchHandler");
const mysql = require('mysql');

global.connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: 'LEDWall$246#',
    database: "cloud"
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));



global.connection.connect();


app.use(cors());

app.get("/",(req, res) => {
    res.send(JSON.stringify({microService:"Search"}))
})

app.listen(3000, () => {
    console.log(`Search app listening at http://localhost:3000`);
});


searchHandler.init();

app.use(function (req, res) {
    res.status(404).send('Something went wrong! Microservice: Search');
});