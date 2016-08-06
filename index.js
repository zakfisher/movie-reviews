'use strict'

var bodyParser = require('body-parser')
var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')
var Email = require('./src/services/email')
var Twitter = require('./src/services/twitter')

// Create Express App
var app = express()
var router = express.Router()
app.set('port', (process.env.PORT || 4200))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, '/src'))
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)

// Add GET Routes
var getRoutes = [
  { path: '/tweet', callback: Twitter.getLatestTweet() },
]
getRoutes.forEach(function(route) {
  router.get(route.path, route.callback)
})

// Add POST Routes
var postRoutes = [
  { path: '/email',
    callback: (req, res) => {
      return Email.sendVisitorEmail(req, res)
    }
  },
]
postRoutes.forEach(function(route) {
  router.post(route.path, route.callback)
})

// Add Page Routes
var pages = [
  { path: '/', template: 'index' },
  { path: '*', template: 'index' }
]
pages.forEach(function(page) {
  router.get(page.path, function (req, res) {
    res.render(page.template, { env: process.env.NODE_ENV })
  })
})

// Start Server
app.listen(app.get('port'), function () {
  console.log("App server is running at localhost:" + app.get('port'))
})
