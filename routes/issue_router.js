const express = require('express')
const router = express.Router()
const isNotLoggedIn = require('../middleware/isNotLoggedIn')
const issueController = require('../controllers/issue_controller')

router.get('/', issueController.list)

router.get('/new', issueController.new)

router.get('/:id', issueController.show)

router.post('/', issueController.create)

router.get('/:id/edit', issueController.findForUpdate)

router.put('/:id/edit', issueController.update)

router.delete('/:id', issueController.remove)

module.exports = router
