const express = require('express');
const https = require("https");
const fs = require("fs");
const app = express();
const cookieParser = require('cookie-parser')

module.exports.app = app;

const { MongoClient } = require("mongodb");
const uri = `mongodb://root:${process.env.MYSQL_ROOT_PASSWORD}@mongo:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false`
const client = new MongoClient(uri);

client.connect().then(()=> {
    global.database = client.db("cloud");

})

const cors = require('cors');

const searchHandler = require("./searchHandler");
const mysql = require('mysql');

global.connection = mysql.createConnection({
    host: 'database',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "cloud",
    connectTimeout: 5000
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())



global.connection.connect();


app.use(cors());

app.get("/api/v1/search",(req, res) => {
    res.send(JSON.stringify({microService:"Search"}))
})

app.listen(3000, () => {
    console.log(`Search app listening at http://localhost:3000`);
});


searchHandler.init();

app.use(function (err,req,res,next){
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.send('Something went wrong')
})


app.use(function (req, res) {
    res.status(404).send('Something went wrong! Microservice: Search');
});