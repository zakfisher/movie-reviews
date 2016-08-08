const Reflux = require('reflux')

const MoviesActions = Reflux.createActions([
  'setCurrentMovie',
  'setMovieByIndex',
  'getMoviesByQuery',
])

module.exports = MoviesActions
