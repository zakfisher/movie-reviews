const Rating = React.createClass({
  green: '#6ba954',
  yellow: '#bec019',
  red: '#af050c',
  getDescription: function() {
    var desc = 'FRESH'
    return desc
  },
  getStyle: function() {
    var bg = this.green
    return {
      background: bg
    }
  },
  render: function() {
    console.log('rating', this.props)
    return (
      <div className='rating' style={this.getStyle()}>
        <p>{this.getDescription()}</p>
      </div>
    )
  }
})

module.exports = Rating
