const express = require('express')
const router = express.Router()
const isNotLoggedIn = require('../middleware/isNotLoggedIn')
const issueController = require('../controllers/issue_controller')

router.get('/issues/', issueController.list)

router.get('/issues/new', issueController.new)

router.get('/issues/:id', issueController.show)

router.post('/issues/', issueController.create)

router.get('/issues/:id/edit', issueController.findForUpdate)

router.put('/issues/:id/edit', issueController.update)

router.delete('/issues/:id', issueController.remove)

module.exports = router
