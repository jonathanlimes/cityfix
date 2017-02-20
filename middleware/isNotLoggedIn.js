// blocks those who are not logged in
module.exports = function (req, res, next) {
  if (req.isAuthenticated()) return next()

  req.flash('flash', {
    type: 'danger',
    message: 'Restricted Page. Please Login'
  })
  return res.redirect('/login')
}
