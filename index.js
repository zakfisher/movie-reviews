'use strict'

var bodyParser = require('body-parser')
var express = require('express')
var favicon = require('serve-favicon')
var path = require('path')


// Create Express App
var app = express()
app.set('port', (process.env.PORT || 4200))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, '/src'))
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// Create page & data routes
var Routes = require('./src/routes')
app.use(Routes.router)
Routes.init()

// Start Server
app.listen(app.get('port'), function () {
  console.log("App server is running at localhost:" + app.get('port'))
})
