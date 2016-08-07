const Movie = require('./movie.jsx')

const Content = React.createClass({
  getDefaultProps: function() {
    return {
      movie: {}
    }
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <main className='content'>
        <div className="wrap">
          <Movie movie={this.props.movie} />
        </div>
      </main>
    )
  }
})

module.exports = Content
