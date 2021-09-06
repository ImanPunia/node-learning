const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required:  true
    },
    comment :{
        type: String
    },
    author :{
        type: String
    }
},{
    timestamps:  true
});

const dishSchema = new Schema({
    name:{
        type:  String,
        required: true,
        unique : true
    },
    description: {
        type:  String,
        required: true
    },
    comments :[commentsSchema]
},{
        timestamps:  true
});

var  Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;