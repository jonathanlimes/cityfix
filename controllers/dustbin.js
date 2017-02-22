{
  title: req.body.issues.title,
  address: req.body.issues.address,
  problem: req.body.issues.problem,
  dateCreated: req.body.issues.dateCreated,
  user_id: req.user._id,
  isFixed: req.body.issues.isFixed
}

  Issue.create(req.body.issues, function (err, output)
