const NavLogo = React.createClass({
  render: function() {
    return (
      <a href='/' className='logo'>
        <img src='/images/tomato.png' />
        <p>
          <span style={ {color: 'white', fontStyle: 'italic'} }>Fresh</span>
          <span style={ {color: 'green', fontWeight: 'bold'} }>Tomatoes</span>
        </p>
      </a>
    )
  }
})

const NavLinkItem = React.createClass({
  render: function() {
    const link = this.props.link
    return (
      <li className={this.props.isSelected ? 'active' : ''}>
        <a href={link.href}>{link.text}</a>
      </li>
    )
  }
})

const NavLinks = React.createClass({
  render: function() {
    return (
      <ul className='links'>
        {this.props.links.map(function(link, i) {
          return <NavLinkItem link={link} key={i} isSelected={true} />
        })}
      </ul>
    )
  }
})

const Nav = React.createClass({
  getDefaultProps: function() {
    return {
      links: [
       { text: 'Movie Times', href: '/movie-times' },
       { text: 'Theatres', href: '/theatres' },
       { text: 'Reviews', href: '/reviews' },
       { text: 'Sign In', href: '/login' },
      ]
    }
  },
  getInitialState: function() {
    return {
      currentItemIndex: 0
    }
  },
  render: function() {
    return (
      <nav className='nav'>
        <NavLogo />
        <NavLinks links={this.props.links} />
      </nav>
    )
  }
})

module.exports = Nav
