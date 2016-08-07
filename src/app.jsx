const Nav = require('./components/nav.jsx')
const Search = require('./components/search.jsx')
const Hero = require('./components/hero.jsx')
const Content = require('./components/content.jsx')

const App = React.createClass({
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
      <div className='row'>
        <Nav />
        <Search />
        <Hero movie={this.state.currentMovie} />
        <Content movie={this.state.currentMovie} />
      </div>
    )
  }
})

module.exports = App
