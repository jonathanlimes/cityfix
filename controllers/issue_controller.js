let Issue = require('../models/issue')

let issueController = {

  list: (req, res) => {
    Issue.find({}, function (err, output) {
      res.render('issues/index', {
        issues: output,
        flash: req.flash('flash')[0]
      })
    })
  },
  new: (req, res) => {
    res.render('new')
  },
  show: (req, res) => {
    if (req.query.status) return next('route')
    Issue.findById(req.params.id, function (err, output) {
      if (err) return next(err)
      res.render('issues/show', {
        issue: output
      })
    })
  },
  create: (req, res) => {
    Issue.create(req.body.issues, function (err, output) {
      if (err) {
        if (err.name === 'ValidationError') {
          let errorMessages = []
          for (field in err.errors) {
            errorMessages.push(err.errors[field].message)
          }
          req.flash('flash', {
            type: 'danger',
            message: errorMessages
          })
          res.redirect('/issues')
        }
        return next(err)
      }
      req.flash('flash', {
        type: 'success',
        message: 'New issue successfully created: ' + output.name
      })
      res.redirect('/issues')
    })
  },
  update: (req, res) => {
    Issue.findByIdAndUpdate(req.params.id, {
      status: req.query.status
    }, function (err, output) {
      if (err) return next(err)
      res.redirect('/issues')
    })
  },
  remove: (req, res) => {
    Issue.findByIdAndRemove(req.params.id, function (err, output) {
      if (err) return next(err)
      req.flash('flash', {
        type: 'warning',
        message: 'Deleted an issue'
      })
      res.redirect('/issues')
    })
  }

}

module.exports = issueController
