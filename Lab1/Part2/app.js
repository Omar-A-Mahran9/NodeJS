var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var urlDet = url.parse(req.url, true);
    if(req.url == "/"){
        fs.readFile('index.html', function(error, data){
            res.end(data);
        })
    } else if (req.url == "/register"){
        fs.readFile("register.html", function(error, data){
            res.end(data)
        });

    }else if(urlDet.pathname == "/adduser" && req.method=="POST"){
        req.on('data',(data)=>{
            let newUser = url.parse("/?"+data.toString(),true).query;
            if(newUser.password.length < 8){
                return res.end('Password should be at least 8 characters');
            } // password should be at least 8 characters
        })

        req.on('end',()=>res.end('Registration success'))
    }
    else {
        fs.readFile("404.html", function(error,data){
            res.end(data);
        });
    }

}).listen(8080);

