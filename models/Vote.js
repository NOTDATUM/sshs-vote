var mongoose = require('mongoose');
var Counter = require('./Counter');

var voteSchema = mongoose.Schema({
    name:{type:String},
    nvote:{type:Number},
});

voteSchema.pre('save', async function (next){
    var vote = this;
    if(vote.isNew){
      counter = await Counter.findOne({name:'vote'}).exec();
      if(!counter) counter = await Counter.create({name:'vote'});
      counter.total++;
      counter.save();
    }
    return next();
});
  
var Vote = mongoose.model('vote', voteSchema);
module.exports = Vote;