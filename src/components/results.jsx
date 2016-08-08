const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')
const Rating = require('./rating.jsx')

const Result = React.createClass({
  getDefaultProps: function() {
    return {
      result: {}
    }
  },
  click: function() {
    MoviesActions.setCurrentMovie(this.props.result)
  },
  render: function() {
    const result = this.props.result
    return (
      <li onClick={this.click}>
        <img src={result.poster} />
        <div>
          <h3>{result.movie_name}</h3>
          <Rating rating={result.rating} />
        </div>
      </li>
    )
  }
})

const Results = React.createClass({
  componentWillMount: function() {
    MoviesStore.listen(this.update)
  },
  getInitialState: function() {
    return {
      results: []
    }
  },
  update: function(data) {
    switch (data.action) {
      case 'movies loaded':
        this.setState({ results: data.collection })
        break
      case 'movies by query':
        this.setState({ results: data.results })
        break
    }
  },
  render: function() {
    return (
      <ul className='results' onMouseEnter={MoviesActions.showResults}>
        {this.state.results.map(function(result, i) {
          return <Result result={result} key={i} />
        })}
      </ul>
    )
  }
})

module.exports = Results
