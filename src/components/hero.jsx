const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')

const Hero = React.createClass({
  componentWillMount: function() {
    MoviesStore.listen(this.update)
  },
  componentDidMount: function() {
    const _this = this
    window.addEventListener('scroll', function(e) {
      var percentOffsetY = ((window.pageYOffset / window.innerHeight) * -25) + 'vh'
      _this.setState({ yOffsetPercent: percentOffsetY })
      _this.setState({ style: _this.getStyle(_this.state.currentMovie) })
    })
  },
  getInitialState: function() {
    return {
      yOffsetPercent: 0,
      movie: {},
      style: {},
    }
  },
  getStyle: function(movie) {
    return {
      background: 'url(' + movie.hero + ') center ' + this.state.yOffsetPercent + ' / cover no-repeat',
    }
  },
  update: function(data) {
    switch (data.action) {
      case 'set current movie':
        this.setState({ currentMovie: data.movie })
        this.setState({ style: this.getStyle(data.movie) })
        break
    }
  },
  render: function() {
    return (
      <div className='hero' style={this.state.style}></div>
    )
  }
})

module.exports = Hero
