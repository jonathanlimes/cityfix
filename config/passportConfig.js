var LocalStrategy = require('passport-local').Strategy
var FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/user')

module.exports = function (passport) {
  // passport 'serializes' objects to make them easy to store, converting the user to an identifier (id)
  // ie. the key to the door
  passport.serializeUser(function (user, next) {
    next(null, user.id)
  })
  // Passport "deserializes" objects by taking the user's serialization (id) and looking it up in the database
  passport.deserializeUser(function (id, next) {
    User.findById(id, function (err, user) {
      next(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, givenPassword, next) {
    User.findOne({ 'local.email': email}, function (err, foundUser) {
      if (err) return next(err)
      // blacklist: if no user found kick this guy
      if (!foundUser) {
        return next(err, false, req.flash('flash', {
          type: 'danger',
          message: 'No such user found by this email'
        }))
      }
      // if can find by email, check if password is right
      // if pw is not the same, deny access
      if (!foundUser.validPassword(givenPassword)) {
        return next(null, false, req.flash('flash', {
          type: 'danger',
          message: 'Access denied'
        }))
      }
      // if pw is right, then return next with the foundUser
      return next(err, foundUser)
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, next) {
    // find user with email as given from the callback
    User.findOne({ 'local.email': email }, function (err, foundUser) {
        // inside the callback, if there is a user with the email,
        // call next() middleware with error arguments + update the flash data
      if (err) return next(err)
      if (foundUser) {
        console.log('Same user with same email found')
        return next(null, false, req.flash('flash', {
          type: 'danger',
          message: 'This email is already used'
        }))
        // if not found, save a damn new User
        // save user to the DB as per normal
        // call next() middleware without error args
      } else {
        let newUser = new User({
          local: {
            email: email,
            password: User.encrypt(password) // hashed password
          }
        })

        newUser.save(function (err, output) {
          if (err) return next(err)

          return next(null, output, req.flash('flash', {
            type: 'success',
            message: 'Hello new user, ' + output.local.email + '!'
          }))
        })
      }
    })
  }))

  // passport.use('facebook', new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_API_KEY,
  //   clientSecret: process.env.FACEBOOK_API_SECRET,
  //   callbackURL: 'http://localhost:4001/auth/facebook/callback',
  //   enableProof: true,
  //   profileFields: ['name', 'emails']
  // }, function(access_token, refresh_token, profile, next){
  //
  //   // process.nextTick(function(){
  //   //
  //   // })

  // }))
}
