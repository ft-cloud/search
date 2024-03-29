import express from "express";

import https from "https";

import fs from "fs";

import cookieParser from "cookie-parser";

import {MongoClient} from "mongodb";

import cors from "cors";

import {initSessionPaths} from "./searchHandler";

import mysql from "mysql";

const app = express();
module.exports.app = app;


const uri = `mongodb://root:${process.env.MYSQL_ROOT_PASSWORD}@mongo:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false`
const client = new MongoClient(uri);

client.connect().then(()=> {
    global.database = client.db("cloud");

})
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
app.disable('x-powered-by');




global.connection.connect();


app.use(cors());

app.get("/api/v1/search",(req, res) => {
    res.send(JSON.stringify({microService:"Search"}))
})

app.listen(3000, () => {
    console.log(`Search app listening at http://localhost:3000`);
});


initSessionPaths();

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