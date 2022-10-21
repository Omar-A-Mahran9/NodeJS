var http = require('http');
var fs = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.url == "/") {
        fs.readFile('index.html', function (error, data) {
            res.end(data);
        })
    }

    else if (req.url == "/products") {
        fs.readFile('products.html', function (error, data) {
            res.end(data);
        });
    }

    else if (req.url == "/about") {
        fs.readFile('about.html', function (error, data) {
            res.end(data);
        });
    }

    else if (req.url == "/contact") {
        fs.readFile('contact.html', function (error, data) {
            res.end(data);
        });
    }

    else {
        fs.readFile('404.html', function (error, data) {
            res.end(data);
        });
    }
}).listen(8080);
