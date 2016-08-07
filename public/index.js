(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const Nav = require('./components/nav.jsx')
const Search = require('./components/search.jsx')
const Hero = require('./components/hero.jsx')
const Content = require('./components/content.jsx')

const App = React.createClass({displayName: "App",
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {
      currentMovie: {
        "movie_name": "Tomorrowland",
        "poster": "http://resizing.flixster.com/dH2TEhqdJ5A6xxV3mQBPZ_1yEac=/180x267/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/06/11190666_ori.jpg",
        "hero": "/images/tomorrow-land-hero.jpg",
        "rating": "3.5",
        "description": "From Disney comes two-time Oscar (R) winner Brad Bird's riveting, mystery adventure Tomorrowland, starring Academy Award (R) winner George Clooney. Bound by a shared destiny, former boy-genius Frank (Clooney), jaded by disillusionment, and Casey (Britt Robertson), a bright, optimistic teen bursting with scientific curiosity, embark on a danger-filled mission to unearth the secrets of an enigmatic place somewhere in time and space known only as Tomorrowland. What they must do there changes the world-and them-forever. Featuring a screenplay by Lost writer and co-creator Damon Lindelof and Brad Bird, from a story by Lindelof & Bird & Jeff Jensen, Tomorrowland promises to take audiences on a thrill ride of nonstop adventures through new dimensions that have only been dreamed of.(C) Walt Disney"
      }
    }
  },
  componentDidMount: function() {
    console.log('app rendered')
  },
  render: function() {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement(Nav, null), 
        React.createElement(Search, null), 
        React.createElement(Hero, {movie: this.state.currentMovie}), 
        React.createElement(Content, {movie: this.state.currentMovie})
      )
    )
  }
})

module.exports = App

},{"./components/content.jsx":2,"./components/hero.jsx":3,"./components/nav.jsx":5,"./components/search.jsx":7}],2:[function(require,module,exports){
const Movie = require('./movie.jsx')

const Content = React.createClass({displayName: "Content",
  getDefaultProps: function() {
    return {
      movie: {}
    }
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      React.createElement("main", {className: "content"}, 
        React.createElement("div", {className: "wrap"}, 
          React.createElement(Movie, {movie: this.props.movie})
        )
      )
    )
  }
})

module.exports = Content

},{"./movie.jsx":4}],3:[function(require,module,exports){
const Hero = React.createClass({displayName: "Hero",
  getDefaultProps: function() {
    return {
      movie: {}
    }
  },
  getInitialState: function() {
    return {
      style: {
        background: 'url(' + this.props.movie.hero + ')',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }
  },
  render: function() {
    return (
      React.createElement("div", {className: "hero", style: this.state.style})
    )
  }
})

module.exports = Hero

},{}],4:[function(require,module,exports){
const Poster = require('./poster.jsx')

const MovieInfo = React.createClass({displayName: "MovieInfo",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("h1", null, this.props.movie.movie_name), 
        React.createElement("p", null, this.props.movie.description)
      )
    )
  }
})

const Movie = React.createClass({displayName: "Movie",
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      React.createElement("article", {className: "movie"}, 
        React.createElement(Poster, {movie: this.props.movie}), 
        React.createElement(MovieInfo, {movie: this.props.movie})
      )
    )
  }
})

module.exports = Movie

},{"./poster.jsx":6}],5:[function(require,module,exports){
const Nav = React.createClass({displayName: "Nav",
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      React.createElement("nav", {className: "nav"})
    )
  }
})

module.exports = Nav

},{}],6:[function(require,module,exports){
const Poster = React.createClass({displayName: "Poster",
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      React.createElement("figure", {className: "poster"}, 
        React.createElement("img", {src: this.props.movie.poster})
      )
    )
  }
})

module.exports = Poster

},{}],7:[function(require,module,exports){
const Search = React.createClass({displayName: "Search",
  getDefaultProps: function() {
    return {}
  },
  getInitialState: function() {
    return {}
  },
  render: function() {
    return (
      React.createElement("div", {className: "search"}, 
        React.createElement("input", {type: "text", placeholder: "Search", name: "query", ref: "search"})
      )
    )
  }
})

module.exports = Search

},{}],8:[function(require,module,exports){
const App = require('./app.jsx')

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('app')
)

},{"./app.jsx":1}]},{},[8]);
