const Nav = require('./components/nav.jsx')
const Hero = require('./components/hero.jsx')
const Content = require('./components/content.jsx')

const App = React.createClass({
  render: function() {
    return (
      <div className='row'>
        <Nav />
        <Hero />
        <Content />
      </div>
    )
  }
})

module.exports = App
