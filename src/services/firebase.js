'use strict'

const Service = require('../service')

class Movies extends Service {
  constructor() {
    super('movies')
  }
}

module.exports = new Movies
