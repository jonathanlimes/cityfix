let Issue = require('../models/issue')

let issueController = {

  list: function (req, res) {
    Issue.find({}, function (err, output) {
      res.render('issues/index', {
        issues: output,
        flash: req.flash('flash')[0]
      })
    })
  },
  new: function (req, res) {
    res.render('issues/new')
  },
  show: function (req, res) {
    Issue.findById(req.params.id, function (err, output) {
      if (err) return next(err)
      res.render('issues/show', {
        issue: output
      })
    })
  },
  create: function (req, res) {
    var newIssue = new Issue({
      title: req.body.issues.title,
      address: req.body.issues.address,
      problem: req.body.issues.problem,
      dateCreated: req.body.issues.dateCreated,
      user_id: req.user._id,
      user_firstName: req.user.firstName,
      user_lastName: req.user.lastName,
      isFixed: req.body.issues.isFixed
    })

    newIssue.save(function (err, output) {
      if (err) {
        if (err.title === 'ValidationError') {
          let errorMessages = []
          for (field in err.errors) {
            errorMessages.push(err.errors[field].message)
          }
          req.flash('flash', {
            type: 'danger',
            message: errorMessages
          })
          res.redirect('issues')
        }
        return next(err)
      }
      req.flash('flash', {
        type: 'success',
        message: 'New issue request successfully created: ' + output.title
      })
      var userIssues = req.user.local.issue_id
      userIssues.push(newIssue)
      req.user.save()
      res.redirect('issues')
    })
  },
  findForUpdate: function (req, res) {
    Issue.findById(req.params.id, function (err, issueToEdit) {
      if (err) return next(err)
      console.log(issueToEdit)
      res.render('issues/edit', {
        issueToEdit: issueToEdit
      })
    })
  },
  update: function (req, res) {
    var editedIssue = req.body.issues
    Issue.findByIdAndUpdate(req.params.id, editedIssue, function (err, output) {
      if (err) return next(err)
      req.flash('flash', {
        type: 'success',
        message: 'Issue request successfully edited'
      })
      res.redirect('/issues')
    })
  },
  remove: function (req, res) {
    Issue.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) console.error(err)
      req.flash('flash', {
        type: 'warning',
        message: 'Deleted an issue'
      })
      var deletedIssueId = req.params.id
      var userIssues = req.user.local.issue_id
      userIssues.splice(userIssues.indexOf(deletedIssueId), 1)
      req.user.save()
      res.redirect('/issues')
    })
  }
}

module.exports = issueController
