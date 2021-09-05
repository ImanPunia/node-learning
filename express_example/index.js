const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser =  require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app =  express();
app.use(morgan('dev'));
app.use(express.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes',(req,res,next) => {
    res.end('Under construction');
});

app.post('/dishes', (req,res,next) => {
    res.end('You will be able to save new dishes soon.');
});

app.put('/dishes' , (req,res,next) => {
    res.statusCode = 403;
    res.end('operation is not supported on all dishes');
});

app.delete('/dishes' , (req,res,next) => {
    res.end('All the dishes will be deleted');
})  

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