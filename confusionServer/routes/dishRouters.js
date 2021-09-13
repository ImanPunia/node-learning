const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(express.json());

// routes for dishe
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


//routes for inidividual dishes
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

//routes for all  comments on specific  dish
dishRouter.route('/:dishId/comments')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments);
        } else {
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( (req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((existingDish) => {
        if(existingDish !== null) {
            existingDish.comments.push(req.body);
            existingDish.save()
            .then((savedDish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(savedDish);
            },(err) => next(err));
        } else {
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('operation is not supported on all dishes' + req.params.dishId);
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((existingDish) => {
        if(existingDish !== null) {
            const comments =  existingDish.comments;
            for(let i = (comments.length -1); i >= 0 ; i --) {
                comments.id(existingDish.comments[i]._id).remove();
            }
            existingDish.save()
            .then((savedDish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(savedDish);
            }, (err) => next(err));
        } else {
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


//routes  for specific comments on specific dish
dishRouter.route('/:dishId/comments/:commentId')
.get((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish !== null && dish.comments.id(req.params.commentId) !== null) {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(dish.comments.id(req.params.commentId));
        } else if(dish === null){
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment' + req.params.commentId+ 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req,res,next) => {
    res.end('not supported ' + req.params.commentId);
})
.put((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish !== null && dish.comments.id(req.params.commentId) !== null) {
            if(req.body.rating) {
                dish.comments.id(req.params.commentId).rating = req.body.rating;
            }
            if(req.body.comment) {
                dish.comments.id(req.params.commentId).comment = req.body.comment;
            }
            dish.save()
            .then((savedDish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(savedDish);
            },(err) => next(err));
        } else if(dish === null){
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment' + req.params.commentId+ 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req,res,next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if(dish !== null && dish.comments.id(req.params.commentId) !== null) {
            dish.comments.id(req.params.commentId).remove();
            dish.save()
            .then((savedDish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(savedDish);
            }, (err) => next(err));
        } else if(dish === null){
            err = new Error('Dish' + req.params.dishId+ 'not found');
            err.status = 404;
            return next(err);
        } else {
            err = new Error('Comment' + req.params.commentId+ 'not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));

});

module.exports = dishRouter;