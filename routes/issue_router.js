const express = require('express')
const router = express.Router()
const isNotLoggedIn = require('../middleware/isNotLoggedIn')
const issueController = require('../controllers/issue_controller')

router.get('/issues/', isNotLoggedIn, issueController.list)

router.get('/issues/new', isNotLoggedIn, issueController.new)

router.get('/issues/:id', isNotLoggedIn, issueController.show)

router.get('/issues/:id/edit', isNotLoggedIn, issueController.findForUpdate)

router.put('/issues/:id/edit', isNotLoggedIn, issueController.update)

router.put('/issues/:id/fix', isNotLoggedIn, issueController.fix)

router.post('/issues', isNotLoggedIn, issueController.create)

router.delete('/issues/:id', isNotLoggedIn, issueController.remove)

module.exports = router
