var express = require('express');
var router = express.Router();
var Vote = require('../models/Vote');
var Counter = require('../models/Counter');

router.get('/vote', function(req, res){
    res.render('home/vote');
});

router.post('/', async function(req, res){
  vote = await Vote.findOne({name:req.user.name}).exec();
  if(vote != null){
    return res.redirect('/again');
  }else{
    req.body.name = req.user.name;
    Vote.create(req.body, function(err, vote){
      if(err){
        return res.redirect('/vote');
      }
    });
    return res.redirect('/finish');
  }
  // fvote = await Vote.findOne({name:req.body.name}).exec();
  // counter = await Counter.findOne({name:'vote'}).exec();
  // if(fvote.nvote == 1) counter.count1++;
  // if(fvote.nvote == 2) counter.count2++;
  // if(fvote.nvote == 3) counter.count3++;
  // counter.save();
});

module.exports = router;