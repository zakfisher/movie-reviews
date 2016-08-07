'use strict'

const express = require('express')
var router = express.Router()

// Services
var Movies = require('./services/movies')

class Routes {
  constructor() {
    this.router = router
    this.defaultPageTitle = 'FreshTomatoes Movie Reviews'
  }

  init() {
    this.addMovieAPIRoutes()
    this.addPageRoutes()
  }

  addMovieAPIRoutes() {
    // Add GET Routes
    var getRoutes = [
      {
        path: '/movies',
        callback: (req, res) => {
          res.send(Movies.getAll())
        }
      },
      {
        path: '/movies/:id',
        callback: (req, res) => {
          res.send('movies/:id')
          // get movie by id
        }
      },
    ]
    getRoutes.forEach((route) => {
      router.get(route.path, route.callback)
    })

    // Add POST Routes
    var postRoutes = [
      { path: '/movies',
        callback: (req, res) => {
          // add movie
        }
      },
    ]
    postRoutes.forEach((route) => {
      router.post(route.path, route.callback)
    })
  }

  addPageRoutes() {
    // Add Page Routes
    var pages = [
      { path: '/', template: 'index' },
      { path: '*', template: 'index' }
    ]
    pages.forEach((page) => {
      router.get(page.path, (req, res) => {
        res.render(page.template, {
          env: process.env.NODE_ENV,
          title: page.title || this.defaultPageTitle
        })
      })
    })
  }
}

module.exports = new Routes
