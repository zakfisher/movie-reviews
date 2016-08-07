const MoviesActions = require('../services/data/movies-actions.jsx')
const MoviesStore = require('../services/data/movies-store.jsx')
const Movie = require('./movie.jsx')

const Content = React.createClass({
  componentWillMount: function() {
    MoviesStore.listen(this.update)
  },
  getInitialState: function() {
    return {
      movie: {}
    }
  },
  update: function(data) {
    switch (data.action) {
      case 'set current movie':
        this.setState({ movie: data.movie })
        break
    }
  },
  render: function() {
    return (
      <main className='content'>
        <div className="wrap">
          <Movie movie={this.state.movie} />
        </div>
      </main>
    )
  }
})

module.exports = Content
