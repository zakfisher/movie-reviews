const Poster = require('./poster.jsx')
const Rating = require('./rating.jsx')

const MovieInfo = React.createClass({
  render: function() {
    const movie = this.props.movie
    return (
      <div className='info'>
        <h1>{movie.movie_name}</h1>
        <Rating rating={movie.rating} />
        <p>{movie.description}</p>
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
      <article className={'movie ' + this.props.grid}>
        <Poster movie={this.props.movie} />
        <MovieInfo movie={this.props.movie} />
      </article>
    )
  }
})

module.exports = Movie
