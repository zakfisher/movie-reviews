const Search = React.createClass({
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <div className='search'>
        <input type='text' placeholder='Search' name='query' ref='search' />
      </div>
    )
  }
})

module.exports = Search
