const Tile = require('./tile.jsx')

const Portfolio = React.createClass({
  getDefaultProps: function() {
    return {
      tiles: [
        {
          bg: 'url("images/audi-tile-bg.jpg")',
          title: 'Audi USA',
          grid: 'col-12'
        },
        {
          bg: 'url("images/westfield-tile-bg.jpg")',
          title: 'Westfield',
          grid: 'col-12 lap-6 desk-8'
        },
        {
          bg: 'url("images/freeland-tile-bg.jpg")',
          title: 'Freeland',
          grid: 'col-12 lap-6 desk-4'
        },
        {
          bg: 'url("images/edmcake-tile-bg.jpg")',
          title: 'EDMCake',
          grid: 'col-12 lap-4'
        },
        {
          bg: 'url("images/scrap-tile-bg.jpg")',
          title: 'Scrap & Haul',
          grid: 'col-12 lap-4'
        },
        {
          bg: 'url("images/upmo-tile-bg.jpg")',
          title: 'Upmo',
          grid: 'col-12 lap-4'
        }
      ]
    }
  },
  render: function() {
    return (
      <main className='portfolio'>
        <div className='row'>
        {this.props.tiles.map(function(tile, i) {
          return <Tile tile={tile} key={i} />
        })}
        </div>
      </main>
    )
  }
})

module.exports = Portfolio
