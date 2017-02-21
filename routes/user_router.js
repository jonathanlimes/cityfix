const express = require('express')
const router = express.Router()
const userController = require('../controllers/user_controller')

router.get('/signup', userController.signup)

router.post('/signup', userController.authSignup)

router.get('/login', userController.login)

router.post('/login', userController.authLogin)

router.get('/logout', userController.logout)

module.exports = router
