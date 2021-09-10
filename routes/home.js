var express = require('express');
var router = express.Router();
var passport = require('../config/passport');
var fs = require('fs');
const { text } = require('body-parser');

router.get('/', function(req, res){
  res.redirect('/login')
});
router.get('/vote', function(req, res){
  res.render('home/vote');
});
router.get('/finish', function(req, res){
  res.render('home/finish');
});
router.get('/again', function(req, res){
  res.render('home/again');
});
router.get('/img1', function(req, res){
  res.render('home/img1');
});
router.get('/img2', function(req, res){
  res.render('home/img2');
});
router.get('/img3', function(req, res){
  res.render('home/img3');
});

router.get('/login', function (req,res) {
  var username = req.flash('username')[0];
  var errors = req.flash('errors')[0] || {};
  res.render('home/login', {
    username:username,
    errors:errors
  });
});

router.post('/login',
  function(req,res,next){
    var errors = {};
    var isValid = true;

    if(!req.body.username){
      isValid = false;
      errors.username = 'Username is required!';
    }
    if(!req.body.password){
      isValid = false;
      errors.password = 'Password is required!';
    }

    if(isValid){
      next();
    }
    else {
      req.flash('errors',errors);
      res.redirect('/login');
    }
  },
  passport.authenticate('local-login', {
    successRedirect : '/vote',
    failureRedirect : '/login'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
