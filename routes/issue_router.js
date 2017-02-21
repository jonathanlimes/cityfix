const express = require('express')
const router = express.Router()
const isNotLoggedIn = require('../middleware/isNotLoggedIn')
const issueController = require('../controllers/issue_controller')

router.get('/', isNotLoggedIn, issueController.list)

router.get('/new', isNotLoggedIn, issueController.new)

router.get('/:id', isNotLoggedIn, issueController.show)

router.post('/', isNotLoggedIn, issueController.create)

router.get('/:id/edit', isNotLoggedIn, issueController.findForUpdate)

router.put('/:id/edit', isNotLoggedIn, issueController.update)

router.delete('/:id', isNotLoggedIn, issueController.remove)

module.exports = router
