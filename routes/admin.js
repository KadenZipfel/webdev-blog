const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const keys = require('../../keys.js');

// Admin Dashboard
router.get('/', (req, res) => {
  res.render('admin/index');
});

// Register page
router.get('/register', (req, res) => {
  res.render('admin/register');
});

// Register logic
router.post('/register', (req, res) => {
  if(req.body.secret == keys.secret) {
    User.register(
      new User({
        email: req.body.email,
        username: req.body.username
      }), req.body.password, (err, user) => {
      if(err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate('local', {
        failureRedirect: '/admin/register'
      })(req, res, () => {
        console.log('Registered new user: ', user);
        res.redirect('/admin');
      });
    });
  } else {
    console.log('Secret incorrect');
    res.redirect('back');
  }
});

// Login page
router.get('/login', (req, res) => {
  res.render('admin/login');
});

// Login logic
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/admin/login'
  }), (req, res) => {
    console.log('Successfully logged in');
    res.redirect(req.session.returnTo || '/admin');
    delete req.session.returnTo;
});

module.exports = router;