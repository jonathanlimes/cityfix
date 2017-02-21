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
    Issue.create(req.body.issues, function (err, output) {
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
      res.redirect('issues')
    })
  }
}

module.exports = issueController
