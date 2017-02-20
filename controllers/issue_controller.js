// all the logic goes here
let Issue = require('../models/issue')

let issueController = {
  list: (req, res) => {
    Issue.find({}, (err, output) => {
      // res.send('test')
      if (err) return next(err)
      res.render('home', {
        requests: output,
        flash: req.flash('flash')[0]
      })
    })
  },

  show: (req, res) => {
    Issue.findById(req.params.id, (err, output) => {
      if (err) return next(err)
      res.render('issues/show', {
        issue: output
      })
    })
  },

  new: (req, res) => {
    res.render('new')
  },

  create: (req, res) => {
    let newRequest = new Issue({
      title: req.body.title,
      nearestBlockNum: req.body.nearestBlockNum,
      street: req.body.street,
      problem: req.body.problem,
      status: req.body.status,
      solution: req.body.solution
    })
    newTodo.save(function (err, savedEntry) {
      if (err) throw err
      res.redirect('/new')
    })
  },

  edit: (req, res) => {
    Issue.findById(req.params.id, (err, output) => {
      if (err) throw err
      res.render('todo/edit', { todoItem: output })
    })
  },

  update: (req, res) => {
    Issue.findOneAndUpdate({
      _id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    }, (err, todoItem) => {
      if (err) throw err
      res.redirect('/todo/' + todoItem.id)
    })
  },

  delete: (req, res) => {
    Issue.findByIdAndRemove(req.params.id, (err, output) => {
      if (err) throw err
      res.redirect('/todo')
    })
  }

}

module.exports = issueController
