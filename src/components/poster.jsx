const Poster = React.createClass({
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <figure className='poster'>
        <img src={this.props.movie.poster} />
      </figure>
    )
  }
})

module.exports = Poster
