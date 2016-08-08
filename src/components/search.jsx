const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')
const Results = require('./results.jsx')

const Search = React.createClass({
  componentWillMount: function() {
    MoviesStore.listen(this.update)
  },
  getInitialState: function() {
    return {
      results: []
    }
  },
  searchByQuery: function() {
    const query = this.refs.query.value
    MoviesActions.getMoviesByQuery(query)
  },
  update: function(data) {
    switch (data.action) {
      case 'movies by query':
        this.setState({ results: data.results })
        break
    }
  },
  render: function() {
    return (
      <div className={'search ' + this.props.grid}>
        <input type='text' placeholder='Search' name='query' ref='query' onKeyUp={this.searchByQuery} onFocus={MoviesActions.showResults} />
        <Results results={this.state.results} />
      </div>
    )
  }
})

module.exports = Search
