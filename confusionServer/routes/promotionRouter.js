const express =  require('express');

const promotionRouter = express.Router();

promotionRouter.use(express.json());

promotionRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('here are the promoton criteria for all designations');
})
.post( (req,res,next) => {
    res.end('soon you will be able to add new promotion criteria.');
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('operation is not supported on all promotions');
})
.delete((req,res,next) => {
    res.end('All the promotions criteria will be deleted');
});

promotionRouter.route('/:promoId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('here are the promoton criteria for all id ' +  req.params.promoId);
})
.post( (req,res,next) => {
    res.end('soon you will be able to add inidividual promotion criteria for  id ' +  req.params.promoId);
})
.put((req,res,next) => {
    res.end('promotion with id ' + req.params.promoId + ' will be updated');
})
.delete((req,res,next) => {
    res.end('All the promotion criteria with id ' + req.params.promoId + ' will be deleted');
});

module.exports = promotionRouter;