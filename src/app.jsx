const Footer = require('./components/footer.jsx')
const Portfolio = require('./components/portfolio.jsx')
const Sidebar = require('./components/sidebar.jsx')

const App = React.createClass({
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      <div className='row'>
        <Sidebar />
        <Portfolio />
        <Footer />
      </div>
    )
  }
})

module.exports = App
