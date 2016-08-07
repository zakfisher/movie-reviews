const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')

const Hero = React.createClass({
  componentWillMount: function() {
    MoviesStore.listen(this.update)
  },
  // componentDidMount: function() {
  //   setTimeout(function() {
  //     MoviesActions.setMovieByIndex(2)
  //   }, 3000)
  // },
  getInitialState: function() {
    return {
      movie: {},
      style: {},
    }
  },
  getStyle: function(movie) {
    return {
      background: 'url(' + movie.hero + ') center center / cover no-repeat',
    }
  },
  update: function(data) {
    switch (data.action) {
      case 'set current movie':
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
