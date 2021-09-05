const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Under construction');
})
.post( (req,res,next) => {
    res.end('You will be able to save new dishes soon.');
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('operation is not supported on all dishes');
})
.delete((req,res,next) => {
    res.end('All the dishes will be deleted');
});

module.exports = dishRouter;