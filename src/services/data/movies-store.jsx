const request = require('ajax-request')
const Reflux = require('reflux')
const MoviesActions = require('./movies-actions.jsx')

const MoviesStore = Reflux.createStore({
  listenables: [MoviesActions],
  data: {
    defaultMovieIndex: 0,
    collection: []
  },
  init: function() {
    this._cacheMovieData()
  },
  _cacheMovieData: function() {
    // Get all movies and cache them in localStorage for offline use
    var _this = this
    request('/movies', function(err, res, movies) {
      const collection = JSON.parse(movies).movies || []

      // If unable to fetch movie data dynamically, attempt to set our data from localStorage.
      if (err) {
        collection = localStorage.getItem('movies') || collection
      }

      // Cache data in store
      _this.data.collection = collection

      // Store collection in localStorage
      localStorage.setItem('movies', collection)

      // Set default movie
      MoviesActions.setMovieByIndex(_this.data.defaultMovieIndex)

      // Trigger data loaded event
      _this.trigger({
        action: 'movies loaded',
        collection: collection
      })
    })
  },
  onGetMoviesByQuery: function(query) {
    // Return matches by movie name
    var results = this.data.collection.map(function(movie, i) {
      const nameSegment = movie.movie_name.toLowerCase()
      const matchFound = nameSegment.indexOf(query.toLowerCase()) > -1
      return matchFound ? movie : null
    }).filter(function(_) { return _ !== null })

    this.trigger({
      action: 'movies by query',
      results: results,
      query: query
    })
  },
  onSetMovieByIndex: function(index) {
    const movie = this.data.collection[index] || {}
    MoviesActions.setCurrentMovie(movie)
  },
  onSetCurrentMovie: function(movie) {
    this.trigger({
      action: 'set current movie',
      movie: movie
    })
  },
})

module.exports = MoviesStore
