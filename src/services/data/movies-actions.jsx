const Reflux = require('reflux')

const MoviesActions = Reflux.createActions([
  'setCurrentMovie',
  'setMovieByIndex',
  'getMoviesByQuery',
  'hideResults',
  'showResults',
])

module.exports = MoviesActions
