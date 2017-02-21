const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const userController = require('../controllers/user_controller')

router.get('/signup', isLoggedIn, userController.signup)

router.post('/signup', userController.authSignup)

router.get('/login', isLoggedIn, userController.login)

router.post('/login', userController.authLogin)

router.get('/logout', userController.logout)

module.exports = router
