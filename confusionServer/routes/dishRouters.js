const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(express.json());

dishRouter.route('/')
.get((req,res,next) => {
    Dishes.find({})
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req,res,next) => {
    Dishes.create(req.body)
    .then((dish) => {
        console.log('dish created');
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('operation is not supported on all dishes');
})
.delete((req,res,next) => {
    Dishes.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req,res,next) => {
    res.end('not supported ' + req.params.dishId);
})
.put((req,res,next) => {
    Dishes.findByIdAndUpdate(req.params.dishId,  {
        $set: req.body
    }, { new:  true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(res);
    }, (err) => next(err))
    .catch((err) => next(err));

});

module.exports = dishRouter;