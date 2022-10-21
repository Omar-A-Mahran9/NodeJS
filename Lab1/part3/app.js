var exp = require('express');
var app = exp();

app.get('/', function(req,res){
    res.sendFile(__dirname + "index.html");
});

app.listen(8080)