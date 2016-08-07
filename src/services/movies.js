'use strict'

const Service = require('./service')
const MoviesCollection = require('./data/movies-collection')

class Movies extends Service {
  constructor() {
    super('movies')
    this.collection = MoviesCollection
  }
}

module.exports = new Movies
