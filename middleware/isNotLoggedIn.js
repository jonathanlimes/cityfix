// blocks those who are not logged in
module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'Page is for members only. Please log in or register.'
  })
  return res.redirect('/login')
}
