const Poster = require('./poster.jsx')

const MovieInfo = React.createClass({
  render: function() {
    return (
      <div>
        <h1>{this.props.movie.movie_name}</h1>
        <p>{this.props.movie.description}</p>
      </div>
    )
  }
})

const Movie = React.createClass({
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <article className='movie'>
        <Poster movie={this.props.movie} />
        <MovieInfo movie={this.props.movie} />
      </article>
    )
  }
})

module.exports = Movie
