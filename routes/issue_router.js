const express = require('express')
const router = express.Router()
const issueController = require('../controllers/issue_controller')

router.get('/', issueController.list)

router.get('/new', issueController.new)

router.get('/:id', issueController.show)

router.get('/:id/edit', issueController.edit)

router.post('/', issueController.create)

router.put('/:id', issueController.update)

router.delete('/:id', issueController.delete)

module.exports = router
