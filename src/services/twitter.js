'use strict'

var https = require('https')
var OAuth2 = require('oauth').OAuth2
var oauth2 = new OAuth2(process.env.TW_CONSUMER_KEY, process.env.TW_CONSUMER_SECRET, 'https://api.twitter.com/', null, 'oauth2/token', null)

class Twitter {
  constructor() {
    this.twitterToken = null
    this.latestTweet = null
    this.latestTweetInt = null
    this.tweetRefreshTimer = 1000 * 60 * 60 // one hour
    this.connect()
  }

  connect() {
    // Set API token
    oauth2.getOAuthAccessToken('',
      { 'grant_type': 'client_credentials' },
      (e, access_token) => {
        this.twitterToken = access_token
        this.setLatestTweet()
        this.startLatestTweetInterval()
      }
    )
  }

  getHeaders(path) {
    return {
      hostname: 'api.twitter.com',
      path: path,
      headers: {
        Authorization: 'Bearer ' + this.twitterToken
      }
    }
  }

  // When a user loads the page, we serve up whatever tweet is cached here on the server.
  getLatestTweet() {
    return (req, res) => {
      res.send(this.latestTweet)
    }
  }

  setLatestTweet() {
    var user = '_zak_fisher'
    var limit = 1
    var headers = this.getHeaders(`/1.1/statuses/user_timeline.json?screen_name=${user}&count=${limit}`)
    https.get(headers, (result) => {
      var buffer = ''
      result.setEncoding('utf8')
      result.on('data', (data) => {
        buffer += data
      })
      result.on('end', () => {
        var tweets = JSON.parse(buffer)
        if (tweets[0]) {
          this.latestTweet = tweets[0].text
        }
      })
    })
  }

  // Hit twitter once/hour to get the latest tweet.
  startLatestTweetInterval() {
    setInterval(() => {
      this.setLatestTweet()
    }, this.tweetRefreshTimer)
  }
}

module.exports = new Twitter
