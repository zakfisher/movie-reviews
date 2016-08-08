const Rating = React.createClass({
  getDescription: function() {
    var desc = 'FRESH'
    return desc
  },
  getStyle: function() {
    var bg = 'green'
    return {
      background: bg
    }
  },
  render: function() {
    return (
      <div className='rating' style={this.getStyle()}>
        <p>{this.getDescription()}</p>
      </div>
    )
  }
})

module.exports = Rating
