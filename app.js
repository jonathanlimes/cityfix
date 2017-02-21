var dotenv = require('dotenv').config({silent: true})
//dotenv.load()
var express = require('express')
var path = require('path')
var debug = require('debug')
var logger = require('morgan')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var expressLayouts = require('express-ejs-layouts')
var app = express()
var router = express.Router()
var methodOverride = require('method-override')
var passport = require('passport')

// to set up session-saving for flash purposes
var session = require('express-session')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var MongoStore = require('connect-mongo')(session)

mongoose.connect("mongodb://jonathanlimes:project2@ds157509.mlab.com:57509/cityfix")
mongoose.Promise = global.Promise

app.use(express.static('public'))

app.use(cookieParser('sososecret'))
app.use(session({
  secret: 'sososecret',
  cookie: { maxAge: 360000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://jonathanlimes:project2@ds157509.mlab.com:57509/cityfix',
    autoReconnect: true,
    mongooseConnection: mongoose.connection
  })
}))

app.use(passport.initialize())
app.use(passport.session())
require('./config/passportConfig')(passport)

app.use(flash())
app.use(methodOverride('_method'))
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.use(expressLayouts)
app.set('view engine', 'ejs')

// All routes will now have users' data if there is any. Accesses users' DB.
app.use(function (req, res, next) {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// require all routers
// const authRouter = require('./routes/auth_router')
// app.use('/', authRouter)

const issueRouter = require('./routes/issue_router')
app.use('/issues', issueRouter)

const userRouter = require('./routes/user_router')
app.use('/', userRouter)

// Render default homepage
app.get('/', function (req, res) {
  res.render('home')
})

app.get('/about', function(req, res) {
  res.render('about')
})

// Development Error Handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// Launch / Port Listener
const port = process.env.PORT || 5000
app.listen(port, function () {
  console.log('CityFix App is running on localhost://' + port)
})
