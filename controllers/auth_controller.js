const express = require('express')
const router = express.Router()
const passport = require('passport')
// const todoController = require('../controllers/animal_controller')

router.get('/signup', function (req, res) {
  res.render('auth/signup', {
    flash: req.flash('flash')[0]
  }) // render the form
})

router.post('/signup', function (req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: false
  })

  return signupStrategy(req, res)
})

function isLoggedIn(req,res,next) {
  if (req.isAuthenticated() === false) return next()

  req.flash('flash', {
    type: 'warning',
    message: 'You are already logged in'
  })
  return res.redirect('/animals')
}

router.get('/login', isLoggedIn, function (req, res) {
  res.render('auth/login', {
    flash: req.flash('flash')[0]
  })
})

router.post('/login', function (req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
  })

  return loginStrategy(req, res)
})

router.get('/logout', (req, res) => {
  req.logout()
  // removes session => req.user will now = undefined again, req.isAuthenticated = false again
  res.redirect('/')
})

module.exports = router
