const passport = require('passport')
const User = require('../models/user')

let userController = {
  signup: function (req, res) {
    res.render('users/signup', {
      flash: req.flash('flash')[0]
    })
  },

  authSignup: function (req, res, next) {
    if(!req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email) {
      req.flash('flash', {
        type: 'danger',
        message: 'Please fill in all fields.'
      })
      res.redirect('/signup')
    }
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/issues',
      failureRedirect: '/signup',
      failureFlash: true
    })
    return signupStrategy(req, res, next)
  },

  login: function (req, res) {
    res.render('users/login', {
      flash: req.flash('flash')[0]
    })
  },

  authLogin: function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    req.flash('flash', {
      type: 'danger',
      message: 'Please fill in all fields.'
    })
    res.redirect('/login')
  }
    var loginStrategy = passport.authenticate('local-login', {
      successRedirect: '/issues',
      failureRedirect: '/login',
      failureFlash: true
    })
    return loginStrategy(req, res, next)
  },

  logout: function (req, res) {
    req.logout()
    req.flash('flash', {
      type: 'success',
      message: 'You have logged out. See you again!'
    })
    res.redirect('/login')
  },

  show: function (req, res) {
    User.findById(req.params.id, function (err, output) {
      if (err) return next(err)
      res.render('users/show', {
        userProfile: output
      })
    })
  }

}

module.exports = userController
