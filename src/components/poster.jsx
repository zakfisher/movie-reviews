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
        <p style={{color:'white'}}>{this.props.movie.rating}</p>
      </figure>
    )
  }
})

module.exports = Poster
