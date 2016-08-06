const request = require('ajax-request')

const Tweet = React.createClass({
  click: function() {
    window.open('http://www.twitter.com/_zak_fisher', '_blank')
  },
  render: function() {
    return (
      <div className="tweet" onClick={this.click}>
        <div className="icon" />
        <div className="bg" />
        <p>Latest <span>{'"' + this.props.tweet}</span></p>
      </div>
    )
  }
})

const Links = React.createClass({
  render: function() {
    return (
      <div className="links col-12 tab-6">
        <div className="bg" />
        <ul>
          {this.props.links.map(function(link, i) {
            return (
              <li key={i}>
                <a href={link.href} target='_blank'>{link.text}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

const Zak = React.createClass({
  render: function() {
    return (
      <div className="zak col-12 tab-6">
        <img src={this.props.imgPath} />
        <h1>{this.props.name}</h1>
        <h2>{this.props.desc}</h2>
      </div>
    )
  }
})

const Footer = React.createClass({
  getDefaultProps: function() {
    return {
      tweetRefreshTimer: 1000 * 60 * 60, // 1hr
      name: 'Zak Fisher',
      desc: 'Full Stack Engineer, UX Specialist, Entrepreneur',
      imgPath: '/images/zak.png',
      links: [
        { text: 'LinkedIn', href: 'http://www.linkedin.com/in/zakfisher' },
        { text: 'Github', href: 'http://www.github.com/zakfisher' },
        { text: 'Twitter', href: 'http://www.twitter.com/_zak_fisher' },
        { text: 'Resume', href: 'https://docs.google.com/a/super-fantastic.com/document/d/1eUOpirakSnOroMWk3KH8ZogVX4evWcTOMQ-6YdbgZqA' }
      ]
    }
  },
  getInitialState: function() {
    return {
      tweetRefreshInterval: null,
      tweetRefreshLock: false,
      tweet: ''
    }
  },
  getLatestTweet: function() {
    var _this = this
    request('/tweet', function(err, res, latestTweet) {
      _this.setState({tweet: latestTweet})
    })
  },
  componentDidMount: function() {
    this.getLatestTweet()
  },
  render: function() {
    return (
      <footer className='footer row'>
        <Links links={this.props.links} />
        <Zak name={this.props.name} desc={this.props.desc} imgPath={this.props.imgPath} />
        <Tweet tweet={this.state.tweet} />
      </footer>
    )
  }
})

module.exports = Footer
