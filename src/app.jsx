const Nav = require('./components/nav.jsx')
const Search = require('./components/search.jsx')
const Hero = require('./components/hero.jsx')
const Content = require('./components/content.jsx')

const App = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <Nav />
        <Search />
        <Hero />
        <Content />
      </div>
    )
  }
})

module.exports = App
