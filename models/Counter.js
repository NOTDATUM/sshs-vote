var mongoose = require('mongoose');

var counterSchema = mongoose.Schema({
    name:{type:String},
    count1:{type:Number, default:0},
    count2:{type:Number, default:0},
    count3:{type:Number, default:0},
    total:{type:Number, default:0}
});

var Counter = mongoose.model('counter', counterSchema);
module.exports = Counter;