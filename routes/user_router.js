const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const isNotLoggedIn = require('../middleware/isNotLoggedIn')
const userController = require('../controllers/user_controller')

router.get('/signup', isLoggedIn, userController.signup)

router.post('/signup', userController.authSignup)

router.get('/login', isLoggedIn, userController.login)

router.post('/login', userController.authLogin)

router.get('/logout', userController.logout)

router.get('/users/:id', isNotLoggedIn, userController.show)

module.exports = router
