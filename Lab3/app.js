const express = require('express');
const bodyParser = require('body-parser');
const formParser = bodyParser.urlencoded();
const cokieParser = require('cookie-parser');
const cors = require('cors');
const mongodb = require('mongodb');
const app = new express();
const dbclient = new mongodb.MongoClient("mongodb://localhost:27017");
const db = dbclient.db("my_db");
dbclient.connect();

app.set("view engine", "ejs");
app.use(cors());
app.use(formParser);
app.use(cokieParser());

app.get("/", function(req, res){
    res.render("login.ejs");
});


app.post("/login", async function(req, res){
    var user = await db.collection("Clients").findOne({
        username: (req.body.username)
    });
    
    if(user && req.body.password == user.password){
        user.sid = Math.random();
        res.cookie('sid', user.sid);
        res.send("Login Success");
    }else {
        res.send("Wrong username or password!");
    }
});

app.post("/addClient", function(req, res){
    console.log(req.body);
    db.collection("Clients").insertOne(req.body);
    res.send({msg:"Client Added Successfully"});
});

app.listen(8080);