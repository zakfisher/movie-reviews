const Hero = React.createClass({
  getDefaultProps: function() {
    return {
      movie: {}
    }
  },
  getInitialState: function() {
    return {
      style: {
        background: 'url(' + this.props.movie.hero + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }
  },
  render: function() {
    return (
      <div className='hero' style={this.state.style}></div>
    )
  }
})

module.exports = Hero
