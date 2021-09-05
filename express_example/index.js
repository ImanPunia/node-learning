const express = require('express');
const http = require('http');
const morgan = require('morgan');
const dishRouter = require('./routes/dishRouters');

const hostname = 'localhost';
const port = 3000;

const app =  express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/dishes', dishRouter);
app.use(express.static(__dirname+ '/public'));

app.use((req,res,next) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><p>This is an express server</p></body></html>')
})

const server =  http.createServer(app);

server.listen(port,hostname, () => {
        console.log(`server running at https://${hostname}:${port}`);
})