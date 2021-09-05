const http  = require('http');
const fs =  require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req,res) => {
    console.log('Rquest for ' + req.url + 'by method' + req.method);

    res.statusCode = 200;

    //id method is GET
    if(req.method == 'GET'){
        var fileUrl;

        //reading url and settting the file according to the url 
        if( req.url == '/') {
            fileUrl = '/index.html'
        } else {
            fileUrl = req.url;
        }

        console.log(fileUrl);

        //resolving the file path
        var filePath = path.resolve('./public' + fileUrl);
        console.log(filePath);

        const fileExtension = path.extname(filePath);

        //verifys if its the html file
        if(fileExtension ==  '.html'){
            fs.stat(filePath, (err,exists) => {

                //if file does not exist
                if(!exists) {
                    res.statusCode =  404;
                    res.setHeader('Content-Type' , 'text/html');
                    res.end('<htlm><body><h1>ERROR 404: ' + fileUrl + 'not Found </h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'text/html');

                //reading the file 
                fs.createReadStream(filePath).pipe(res);
            })
        } else {
            res.statusCode =  404;
            res.setHeader('Content-Type' , 'text/html');
            res.end('<htlm><body><h1>ERROR 404: ' + fileUrl + 'not HTML file </h1></body></html>');
            return;
        }
    } else {
        res.statusCode =  404;
        res.setHeader('Content-Type' , 'text/html');
        res.end('<htlm><body><h1>ERROR 404: ' + req.method + 'not supported </h1></body></html>');
        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at https://${hostname}:${port}`);
});

//localhos:3000
//localhost:3000/aboutUs.html
//localhost:3000/text.html
//same hits with Post 