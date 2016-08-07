const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')

const Result = React.createClass({
  getDefaultProps: function() {
    return {
      result: {}
    }
  },
  render: function() {
    return (
      <li>
        <img src={this.props.result.poster} />
        <h3>{this.props.result.movie_name}</h3>
        <p>Fresh</p>
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
      results: [],
      showResults: false
    }
  },
  update: function(data) {
    switch (data.action) {
      case 'movies by query':
        this.setState({ results: data.results })
        break
      case 'hide results':
        this.setState({ showResults: false })
        break
      case 'show results':
        this.setState({ showResults: true })
        break
    }
  },
  render: function() {
    if (this.state.showResults) {
      return (
        <ul className='results'>
          {this.state.results.map(function(result, i) {
            return <Result result={result} key={i} />
          })}
        </ul>
      )
    }
    else return <ul style={ { display: 'none' } }></ul>
  }
})

module.exports = Results
