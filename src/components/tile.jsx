const TileTitle = React.createClass({
  render: function() {
    return (
      <div className='title'>
        <h1>{this.props.title}</h1>
        <div className='title-bg' />
      </div>
    )
  }
})

const Tile = React.createClass({
  click: function() {
    console.log('click tile', this.props.tile)
  },
  getDefaultProps: function() {
    return {
      tile: {
        title: 'Tile',
        bg: 'none',
        grid: 'col-12'
      }
    }
  },
  getInitialState: function() {
    return {
      style: {
        background: this.props.tile.bg
      }
    }
  },
  render: function() {
    var className = 'tile ' + this.props.tile.grid
    return (
      <div className={className} onClick={this.click}>
        <div className='bg' style={this.state.style} />
        <TileTitle title={this.props.tile.title} />
      </div>
    )
  }
})

module.exports = Tile
