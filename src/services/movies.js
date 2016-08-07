'use strict'

const Collection = require('./collection')
const MoviesData = require('./data/movies-data')

class Movies extends Collection {
  constructor() {
    super('movies', MoviesData)
  }
}

module.exports = new Movies
